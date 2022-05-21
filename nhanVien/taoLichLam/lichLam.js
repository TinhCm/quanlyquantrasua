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

                    return `
                            <option value="${nhanVien.MANV}">Mã nhân viên: ${nhanVien.MANV + ' - ' + nhanVien.TENNV}</option>
                            `
                })
                document.querySelector('.manv').innerHTML = htmls.join('');

                var check_name = data.find(function(users) {
                    return users.MANV === getCookie('ma');
                })

                try {
                    if (check_name.TENPQ === true) {
                        lichLam();
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

var url_ca = 'http://localhost:3000/getTopCa';

function tao_ma() {
    fetch(url_ca, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                if ((data == '')) {
                    localStorage.setItem('max_maclv', 0);
                } else {
                    data.map(function(ca) {
                        localStorage.setItem('max_maclv', ca.MACLV);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

var manv = document.querySelector('.manv');
var maca = document.querySelector('.maca');
var tenca = document.querySelector('.tenca');
var dateBD = document.querySelector('.dateBD');
var check_dateBD = document.querySelector('.check_dateBD');
var themCa = document.querySelector('.themCa');

var max_ma = localStorage.getItem('max_manv').slice(2);
manv.value = 'Mã nhân viên: NV' + (Number(max_ma) + 1)
var max_maclv = localStorage.getItem('max_maclv').slice(1);
maca.innerHTML = 'Mã ca làm việc: C' + (Number(max_maclv) + 1);


function heSo() {
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
                var check_name = data.find(function(users) {
                    return users.MANV === manv.value;
                })
                var thang = new Date(check_name.NGAYVAOLAM);
                var namBD = thang.getUTCFullYear();
                var thangBD = thang.getUTCMonth() + 1;
                localStorage.setItem('thangBD', thangBD);
                localStorage.setItem('namBD', namBD);
            }

        })
        .catch((error) => {
            alert(error)
        });
}
manv.onchange = function() {
    heSo();
}

function lichLam() {
    themCa.onclick = function() {

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
            check_dateBD.innerHTML = 'Thời gian không hợp lệ'
        } else {
            check_dateBD.innerHTML = '';
            var KT = new Date(dateBD.value);
            var namKT = KT.getUTCFullYear();
            var thangKT = KT.getUTCMonth() + 1;
            var thangLV;

            if (namKT - localStorage.getItem('namBD') == 0) {
                thangLV = thangKT - localStorage.getItem('thangBD');
            } else if (namKT - localStorage.getItem('namBD') <= 1) {
                thangLV = thangKT + (12 - localStorage.getItem('thangBD'));
            } else {
                thangLV = 24;
            }

            var heSoLuong;
            if (thangLV <= 5) {
                heSoLuong = 18000;
            } else if (thangLV <= 10) {
                heSoLuong = 20000;
            } else if (thangLV <= 15) {
                heSoLuong = 22000
            } else if (thangLV < 24) {
                heSoLuong = 24000;
            } else {
                heSoLuong = 26000;
            }

            var gioBD;
            var gioKT;
            var thanhTien;
            thanhTien = heSoLuong * 5;
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
                MANV: manv.value,
                MACLV: 'C' + (Number(max_maclv) + 1),
                TENCLV: tenca.value,
                GIOBD: dateBD.value + ' ' + gioBD,
                GIOKT: dateBD.value + ' ' + gioKT,
                HESOLUONG: heSoLuong,
                THANHTIEN: thanhTien,
                NGAYLAM: format_date,
            };

            var url_postCA = 'http://localhost:3000/postCa';
            fetch(url_postCA, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("Tạo thành công")
                    tao_ma();
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