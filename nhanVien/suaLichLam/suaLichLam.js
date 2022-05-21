$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

var url_user = 'http://localhost:3000/getNV';

function get_ma() {
    fetch(url_user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {

                var htmls = data.map(function(nhanVien) {
                    if (nhanVien.MANV == localStorage.getItem('manv_ca')) {
                        return `
                            <option selected="selected" value="${nhanVien.MANV}">Mã nhân viên: ${nhanVien.MANV + ' - ' + nhanVien.TENNV}</option>
                            `
                    } else {
                        return `
                            <option value="${nhanVien.MANV}">Mã nhân viên: ${nhanVien.MANV + ' - ' + nhanVien.TENNV}</option>
                            `
                    }
                })
                document.querySelector('.manv').innerHTML = htmls.join('');

                var check_name = data.find(function(users) {
                    return users.MANV === getCookie('ma');
                })

                try {
                    if (check_name.TENPQ === true) {
                        suaLichLam();
                    } else {
                        alert("Tài khoản không hợp lệ");
                    }
                } catch (error) {

                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
get_ma();

var manv = document.querySelector('.manv');
var maca = document.querySelector('.maca');
var tenca = document.querySelector('.tenca');
var dateBD = document.querySelector('.dateBD');
var dateKT = document.querySelector('.dateKT');
var luuCa = document.querySelector('.luuCa');

var check_dateBD = document.querySelector('.check_dateBD');

function getItem() {
    var url_getCa = 'http://localhost:3000/getCa';
    fetch(url_getCa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                var loc = data.find(function(ca) {
                    return ca.MACLV === localStorage.getItem('maclv');
                })
                maca.innerHTML = 'Mã ca làm việc: ' + localStorage.getItem('maclv')

                if (loc.TENCLV == 'Sáng') {

                    var htmls = `
                                <option selected="selected" value="Sáng">Ca: Sáng</option>
                                <option value="Chiều">Ca: Chiều</option>
                                <option value="Tối">Ca: Tối</option>
                                `
                    document.querySelector('.tenca').innerHTML = htmls;
                } else if (loc.TENCLV == 'Chiều') {
                    var htmls = `
                                <option value="Sáng">Ca: Sáng</option>
                                <option selected="selected" value="Chiều">Ca: Chiều</option>
                                <option value="Tối">Ca: Tối</option>
                                `
                    document.querySelector('.tenca').innerHTML = htmls;
                } else {
                    var htmls = `
                                <option value="Sáng">Ca: Sáng</option>
                                <option value="Chiều">Ca: Chiều</option>
                                <option selected="selected" value="Tối">Ca: Tối</option>
                                `
                    document.querySelector('.tenca').innerHTML = htmls;
                }

                var day = new Date(loc.GIOBD);
                var get_day = (day.getUTCDate())
                var get_month = (day.getUTCMonth() + 1);
                if (get_day < 10) {
                    get_day = '0' + get_day;
                }
                if (get_month < 10) {
                    get_month = '0' + get_month;
                }
                var format_date = day.getUTCFullYear() + '/' + get_month + '/' + get_day;
                dateBD.value = format_date;
            }

        })
        .catch((error) => {
            alert(error)
        });


}

getItem();

function suaLichLam() {
    luuCa.onclick = function() {

        var day = new Date(dateBD.value);
        var get_day = (day.getDate())
        var get_month = (day.getMonth() + 1);
        if (get_day < 10) {
            get_day = '0' + get_day;
        }
        if (get_month < 10) {
            get_month = '0' + get_month;
        }
        var format_date = day.getUTCFullYear() + '/' + get_month + '/' + get_day;

        var day = new Date(getMonday(new Date()));
        var get_day = (day.getDate())
        var get_month = (day.getMonth() + 1);
        if (get_day < 10) {
            get_day = '0' + get_day;
        }
        if (get_month < 10) {
            get_month = '0' + get_month;
        }
        var format_date1 = day.getUTCFullYear() + '/' + get_month + '/' + get_day;

        if (dateBD.value === '') {
            check_dateBD.innerHTML = 'Vui lòng nhập ngày làm'
        } else if (format_date < format_date1) {
            check_dateBD.innerHTML = 'Thời gian không hợp lệ';
        } else {
            check_dateBD.innerHTML = '';
            var gioBD;
            var gioKT;
            if (tenca.value == 'Sáng') {
                gioBD = '7:30:00';
                gioKT = '12:30:00';
            } else if (tenca.value == 'Chiều') {
                gioBD = '12:30:00';
                gioKT = '17:30:00';
            } else {
                gioBD = '17:30:00';
                gioKT = '23:00:00';
            }

            var dataPost = {
                MANV_CU: localStorage.getItem('manv_ca'),
                MANV: manv.value,
                MACLV: localStorage.getItem('maclv'),
                TENCLV: tenca.value,
                GIOBD: dateBD.value + ' ' + gioBD,
                GIOKT: dateBD.value + ' ' + gioKT,
            };

            var url_postCA = 'http://localhost:3000/putCa';
            fetch(url_postCA, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("Lưu thành công")
                    localStorage.setItem('manv_ca', manv.value);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    alert(error)
                });
        }

    }
}