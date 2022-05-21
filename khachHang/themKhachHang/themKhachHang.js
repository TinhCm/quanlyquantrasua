$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

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
tao_ma()

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
        } else if (dateBD.value === '') {
            check_tenkh.innerHTML = '';
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
themKH();