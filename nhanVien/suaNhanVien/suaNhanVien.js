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

var suaNV = document.querySelector('.suaNV');
var manv = document.querySelector('.manv');
var tennv = document.querySelector('.tennv');
var diachi = document.querySelector('.diachi');
var matkhau = document.querySelector('.matkhau');
var sdt = document.querySelector('.sdt');
var gioitinh = document.querySelector('.gioitinh');
var chucvu = document.querySelector('.chucvu');
var phanquyen = document.querySelector('.phanquyen');
var date = document.querySelector('.date');
var tenuser = document.querySelector('.tenuser');

var check_manv = document.querySelector('.check_manv');
var check_tennv = document.querySelector('.check_tennv');
var check_diachi = document.querySelector('.check_diachi');
var check_matkhau = document.querySelector('.check_matkhau');
var check_sdt = document.querySelector('.check_sdt');
var check_gioitinh = document.querySelector('.check_gioitinh');
var check_chucvu = document.querySelector('.check_chucvu');
var check_phanquyen = document.querySelector('.check_phanquyen');
var check_tenuser = document.querySelector('.check_tenuser');

var url_user = 'http://localhost:3000/getNV';
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
            var loc = data.find(function(users) {
                return users.MANV === localStorage.getItem('manv');
            })
            localStorage.setItem('ten_user', loc.TENUSER);
            manv.innerHTML = localStorage.getItem('manv');
            tennv.value = loc.TENNV;
            diachi.value = loc.DIACHI;
            tenuser.value = loc.TENUSER;
            matkhau.value = loc.MATKHAU;
            sdt.value = loc.SDT;

            var day = new Date(loc.NGAYVAOLAM);
            var get_day = (day.getDate())
            var get_month = (day.getMonth() + 1);
            if (get_day < 10) {
                get_day = '0' + get_day;
            }
            if (get_month < 10) {
                get_month = '0' + get_month;
            }
            var format_date = day.getFullYear() + '/' + get_month + '/' + get_day;
            date.innerHTML = format_date;

            if (loc.GIOITINH == 'Nam') {

                var htmls = `s
                    <option selected="selected" value="Nam">Giới tính: Nam</option>
                    <option value="Nữ">Giới tính: Nữ</option>
                    `
                document.querySelector('.gioitinh').innerHTML = htmls;
            } else {
                var htmls = `s
                <option value="Nam">Giới tính: Nam</option>
                <option selected="selected" value="Nữ">Giới tính: Nữ</option>
                `
                document.querySelector('.gioitinh').innerHTML = htmls;
            }

            if (loc.CHUCVU == 'Nhân viên') {

                var htmls = `s
                    <option selected="selected" value="Nhân viên">Chức vụ: Nhân viên</option>
                    <option value="Quản lý">Chức vụ: Quản lý</option>
                    `
                document.querySelector('.chucvu').innerHTML = htmls;
            } else {
                var htmls = `s
                    <option value="Nhân viên">Chức vụ: Nhân viên</option>
                    <option selected="selected" value="Quản lý">Chức vụ: Quản lý</option>
                    `
                document.querySelector('.chucvu').innerHTML = htmls;
            }

            if (loc.TENPQ == true) {

                var htmls = `s
                    <option selected="selected" value="true">Phân quyền: True</option>
                    <option value="false">Phân quyền: False</option>
                    `
                document.querySelector('.phanquyen').innerHTML = htmls;
            } else {
                var htmls = `s
                    <option value="true">Phân quyền: True</option>
                    <option selected="selected" value="false">Phân quyền: False</option>
                    `
                document.querySelector('.phanquyen').innerHTML = htmls;
            }
            var check_name = data.find(function(users) {
                return users.MANV === getCookie('ma');
            })

            try {
                if (check_name.TENPQ === true) {
                    suaNhanVien();
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

var url_suaNV = 'http://localhost:3000/putNV'

function suaNhanVien() {
    suaNV.onclick = function() {

        if (tennv.value === '') {
            check_tennv.innerHTML = 'Vui lòng nhập tên nhân viên'
        } else {
            check_tennv.innerHTML = ''
            if (diachi.value === '') {
                check_diachi.innerHTML = 'Vui lòng nhập địa chỉ'
            } else {
                check_diachi.innerHTML = ''
                if (tenuser.value === '') {
                    check_tenuser.innerHTML = 'Vui lòng nhập tên đăng nhập'
                } else {
                    check_tenuser.innerHTML = ''
                    if (matkhau.value === '') {
                        check_matkhau.innerHTML = 'Vui lòng nhập mật khẩu'
                    } else {
                        check_matkhau.innerHTML = ''
                        if (sdt.value === '') {
                            check_sdt.innerHTML = 'Vui lòng nhập số điện thọai'
                        } else {
                            check_sdt.innerHTML = '';
                            check_phanquyen.innerHTML = '';

                            var dataPost = {
                                MANV: manv.innerHTML,
                                TENNV: tennv.value,
                                GIOITINH: gioitinh.value,
                                CHUCVU: chucvu.value,
                                NGAYVAOLAM: date.innerHTML,
                                DIACHI: diachi.value,
                                SDT: sdt.value,
                                TENPQ: phanquyen.value,
                                TENUSER: localStorage.getItem('ten_user'),
                                USER: tenuser.value,
                                MATKHAU: matkhau.value,
                                MAPQ: localStorage.getItem('mapq'),
                                MAMK: localStorage.getItem('mamk')
                            };

                            fetch(url_suaNV, {
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
            }
        }
    }
}