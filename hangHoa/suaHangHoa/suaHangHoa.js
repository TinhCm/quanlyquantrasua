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

var mahh = document.querySelector('.mahh')
var tenhh = document.querySelector('.tenhh')
var giahh = document.querySelector('.giahh')
var mancc = document.querySelector('.mancc')
var sl = document.querySelector('.sl')
var ngaynhap = document.querySelector('.ngaynhap')
var donvi = document.querySelector('.donvi')

var check_mahh = document.querySelector('.check_mahh')
var check_tenhh = document.querySelector('.check_tenhh')
var check_giahh = document.querySelector('.check_giahh')
var check_mancc = document.querySelector('.check_mancc')
var check_sl = document.querySelector('.check_sl')
var check_ngaynhap = document.querySelector('.check_ngaynhap')
var check_donvi = document.querySelector('.check_donvi')

var themCa = document.querySelector('.themCa');

var url_getHH = 'http://localhost:3000/getHangHoa';


function get_ma() {
    fetch(url_getHH, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                var loc = data.find(function(hangHoa) {
                    return hangHoa.MAHH === localStorage.getItem('mavt');
                })
                mahh.innerHTML = 'Mã hàng hóa: ' + localStorage.getItem('mavt')
                tenhh.value = loc.TENHH;
                sl.value = loc.SOLUONG;
                giahh.value = loc.GIAHH;
                donvi.value = loc.DONVI

                var day = new Date(loc.NGAYHDNH);
                var get_day = (day.getUTCDate())
                var get_month = (day.getUTCMonth() + 1);
                if (get_day < 10) {
                    get_day = '0' + get_day;
                }
                if (get_month < 10) {
                    get_month = '0' + get_month;
                }
                var format_date = day.getUTCFullYear() + '/' + get_month + '/' + get_day;
                ngaynhap.value = format_date;
            }

        })
        .catch((error) => {
            alert(error)
        });


}

function getItem() {
    var url_getNCC = 'http://localhost:3000/getNCC';
    fetch(url_getNCC, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                var htmls = data.map(function(hangHoa) {
                    if (hangHoa.MANCC === localStorage.getItem('mancc')) {
                        return `
                            <option selected="selected" value="${hangHoa.MANCC}"> ${hangHoa.MANCC + ' - ' + hangHoa.TEN}</option>
                            `
                    } else {
                        return `
                        <option value="${hangHoa.MANCC}">${hangHoa.MANCC + ' - ' + hangHoa.TEN}</option>
                            `
                    }
                })
                document.querySelector('.mancc').innerHTML = htmls.join('');
            }

        })
        .catch((error) => {
            alert(error)
        })

}

function suaHH() {

    themCa.onclick = function() {

        if (tenhh.value === '') {
            check_tenhh.innerHTML = 'Vui lòng nhập tên hàng hóa';
        } else if (sl.value === '') {
            check_tenhh.innerHTML = '';
            check_sl.innerHTML = 'Vui lòng nhập số lượng'
        } else if (giahh.value === '') {
            check_sl.innerHTML = '';
            check_giahh.innerHTML = 'Vui lòng nhập giá hàng hóa'
        } else if (ngaynhap.value === '') {
            check_giahh.innerHTML = '';
            check_ngaynhap.innerHTML = 'Vui lòng nhập ngày'
        } else if (donvi.value === '') {
            check_ngaynhap.innerHTML = '';
            check_donvi.innerHTML = 'Vui lòng nhập đơn vị tính'
        } else {
            check_donvi.innerHTML = '';
            var dataPost = {
                MAHH: localStorage.getItem('mavt'),
                MANV: getCookie('ma'),
                MAHDNH: localStorage.getItem('mahdnh'),
                TENHH: tenhh.value,
                MALHH: 'LHH1',
                GIAHH: giahh.value,
                MANCC: mancc.value,
                SOLUONG: sl.value,
                NGAYHDNH: ngaynhap.value,
                DONVI: donvi.value
            };

            var url_putSP = 'http://localhost:3000/putHangHoa';
            fetch(url_putSP, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("Lưu thành công");
                    localStorage.setItem('mancc', mancc.value);
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

var url_user = 'http://localhost:3000/getNV';

function check() {
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
                    return users.MANV === getCookie('ma');
                })

                console.log(check_name);
                if (check_name === undefined) {

                } else {
                    get_ma();
                    getItem();
                    suaHH();
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
check();