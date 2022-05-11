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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

var check_manv = document.querySelector('.check_manv');
var check_tennv = document.querySelector('.check_tennv');
var check_diachi = document.querySelector('.check_diachi');
var check_matkhau = document.querySelector('.check_matkhau');
var check_sdt = document.querySelector('.check_sdt');
var check_gioitinh = document.querySelector('.check_gioitinh');
var check_chucvu = document.querySelector('.check_chucvu');
var check_phanquyen = document.querySelector('.check_phanquyen');

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
                return users.MANV === getCookie('edit_ma');
            })
            manv.innerHTML = getCookie('edit_ma')
            tennv.value = loc.TENNV;
            diachi.value = loc.DIACHI;
            matkhau.value = loc.MATKHAU;
            sdt.value = loc.SDT;
            gioitinh.value = loc.GIOITINH
            chucvu.value = loc.CHUCVU;
            phanquyen.value = loc.PHANQUYEN;
            date.innerHTML = loc.NGAYVAOLAM;
        }

    })
    .catch((error) => {
        alert(error)
    });

var url_suaNV = 'http://localhost:3000/putNV'

suaNV.onclick = function() {

    if (tennv.value === '') {
        check_tennv.innerHTML = 'Vui lòng nhập tên nhân viên'
    } else {
        check_tennv.innerHTML = ''
        if (diachi.value === '') {
            check_diachi.innerHTML = 'Vui lòng nhập địa chỉ'
        } else {
            check_diachi.innerHTML = ''
            if (matkhau.value === '') {
                check_matkhau.innerHTML = 'Vui lòng nhập mật khẩu'
            } else {
                check_matkhau.innerHTML = ''
                if (sdt.value === '') {
                    check_sdt.innerHTML = 'Vui lòng nhập số điện thọai'
                } else {
                    check_sdt.innerHTML = ''
                    if (gioitinh.value != 'Nam' && gioitinh.value != 'Nữ') {
                        check_gioitinh.innerHTML = 'Giới tính phải là: Nam hoặc Nữ'
                    } else {
                        check_gioitinh.innerHTML = ''
                        if (chucvu.value != 'Nhân viên' && chucvu.value != 'Quản lý') {
                            check_chucvu.innerHTML = 'Chức vụ phải là: Nhân viên hoặc Quản lý'
                        } else {
                            check_chucvu.innerHTML = '';
                            if (phanquyen.value != 'true' && phanquyen.value != 'false') {
                                check_phanquyen.innerHTML = 'Phân quyền phải là: true hoặc false'
                            } else {
                                check_phanquyen.innerHTML = '';
                                var dataPost = {
                                    MANV: manv.innerHTML,
                                    TENNV: tennv.value,
                                    GIOITINH: gioitinh.value,
                                    CHUCVU: chucvu.value,
                                    NGAYVAOLAM: date.innerHTML,
                                    DIACHI: diachi.value,
                                    SDT: sdt.value,
                                    PHANQUYEN: phanquyen.value,
                                    MATKHAU: matkhau.value
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
}