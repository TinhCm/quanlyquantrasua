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

var url_khachHang = 'http://localhost:3000/getKhachHang';

function tao_ma() {
    fetch(url_khachHang, {
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
                    localStorage.setItem('max_makh', 0);
                } else {

                    data.map(function(khachHang) {
                        localStorage.setItem('max_makh', khachHang.MAKH);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

var makh = document.querySelector('.makh');
var tenkh = document.querySelector('.tenkh');
var loaikh = document.querySelector('.loaikh');
var sdt = document.querySelector('.sdt');
var dateBD = document.querySelector('.dateBD');
var themKhachHang = document.querySelector('.themKhachHang');

var check_makh = document.querySelector('.check_makh');
var check_tenkh = document.querySelector('.check_tenkh');
var check_loaikh = document.querySelector('.check_loaikh');
var check_sdt = document.querySelector('.check_sdt');
var check_dateBD = document.querySelector('.check_dateBD');

function themKH() {

    var max_makh = localStorage.getItem('max_makh').slice(2);
    makh.value = 'Mã khách hàng: KH' + (Number(max_makh) + 1);

    themKhachHang.onclick = function() {
        if (tenkh.value === '') {
            check_tenkh.innerHTML = 'Vui lòng nhập tên khách hàng'
        } else if (sdt.value.length > 11) {
            check_tenkh.innerHTML = '';
            check_sdt.innerHTML = 'Vui lòng nhập số điện thoại hợp lệ'
        } else if (dateBD.value === '') {
            check_sdt.innerHTML = '';
            check_dateBD.innerHTML = 'Vui lòng nhập ngày đăng ký'
        } else {
            check_dateBD.innerHTML = '';
            var dataPost = {
                MAKH: 'KH' + (Number(max_makh) + 1),
                MALKH: loaikh.value,
                TENKH: tenkh.value,
                NGAYDK: dateBD.value,
                SDT: sdt.value
            };

            var url_postKhachHang = 'http://localhost:3000/postKhachHang';
            fetch(url_postKhachHang, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("Thêm thành công")
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
                    tao_ma();
                    themKH();
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
check();