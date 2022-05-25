$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

var makh = document.querySelector('.makh');
var tenkh = document.querySelector('.tenkh');
var loaikh = document.querySelector('.loaikh');
var sdt = document.querySelector('.sdt');
var dateBD = document.querySelector('.dateBD');
var suaKhachHang = document.querySelector('.suaKhachHang');

var check_makh = document.querySelector('.check_makh');
var check_tenkh = document.querySelector('.check_tenkh');
var check_loaikh = document.querySelector('.check_loaikh');
var check_sdt = document.querySelector('.check_sdt');
var check_dateBD = document.querySelector('.check_dateBD');

function getItem() {
    var url_getCa = 'http://localhost:3000/getKhachHang';
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
                var loc = data.find(function(khachHang) {
                    return khachHang.MAKH === localStorage.getItem('makh');
                })

                makh.innerHTML = 'Mã khách hàng: ' + localStorage.getItem('makh');
                sdt.value = loc.SDT;
                tenkh.value = loc.TENKH;
                if (loc.MALKH == 'LKH1') {
                    var htmls = `
                                <option selected="selected" value="LKH1">Loại khách hàng: Thường</option>
                                <option value="LKH2">Loại khách hàng: Vip</option>
                                `
                    document.querySelector('.loaikh').innerHTML = htmls;
                } else {
                    var htmls = `
                                <option value="LKH1">Loại khách hàng: Thường</option>
                                <option selected="selected" value="LKH2">Loại khách hàng: Vip</option>
                                `
                    document.querySelector('.loaikh').innerHTML = htmls;
                }

                var day = new Date(loc.NGAYDK);
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

function suaKH() {
    suaKhachHang.onclick = function() {
        if (tenkh.value === '') {
            check_tenkh.innerHTML = 'Vui lòng nhập tên khách hàng'
        } else if (sdt.value.length > 11) {
            check_tenkh.innerHTML = '';
            check_sdt.innerHTML = 'Vui lòng nhập số điện thoại hợp lệ'
        } else if (dateBD.value === '') {
            check_sdt.innerHTML = '';
            check_dateBD.innerHTML = 'Vui lòng nhập ngày đăng ký'
        } else {
            check_sdt.innerHTML = '';
            var dataPost = {
                MAKH: localStorage.getItem('makh'),
                MALKH: loaikh.value,
                TENKH: tenkh.value,
                NGAYDK: dateBD.value,
                SDT: sdt.value
            };

            var url_postKhachHang = 'http://localhost:3000/putKhachHang';
            fetch(url_postKhachHang, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("Lưu thành công")
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
suaKH();