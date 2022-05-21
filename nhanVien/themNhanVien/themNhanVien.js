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

var url_user = 'http://localhost:3000/getNV';

function tao_ma() {
    fetch(url_user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {} else {
                if (data == '') {
                    localStorage.setItem('max_manv', 0);
                    localStorage.setItem('max_mapq', 0);
                    localStorage.setItem('max_mamk', 0);
                } else {
                    data.map(function(nhanVien) {
                        localStorage.setItem('max_manv', nhanVien.MANV);
                        localStorage.setItem('max_mapq', nhanVien.MAPQ);
                        localStorage.setItem('max_mamk', nhanVien.MAMK);
                    })
                }
                var check_name = data.find(function(users) {
                    return users.MANV === getCookie('ma');
                })

                try {
                    if (check_name.TENPQ === true) {
                        themNhanVien();
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
tao_ma();

var themNV = document.querySelector('.themNV');
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
var check_tenuser = document.querySelector('.check_tenuser');
var check_date = document.querySelector('.check_date');

var max_ma = localStorage.getItem('max_manv').slice(2);
manv.innerHTML = 'Mã nhân viên: NV' + (Number(max_ma) + 1)

var url_themNV = 'http://localhost:3000/postNV'

function themNhanVien() {
    themNV.onclick = function() {

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
                    if (tenuser.value === '') {
                        check_tenuser.innerHTML = 'Vui lòng nhập tên đăng nhập'
                    } else {
                        check_tenuser.innerHTML = ''
                        if (sdt.value === '') {
                            check_sdt.innerHTML = 'Vui lòng nhập số điện thọai'
                        } else if (date.value === '') {
                            check_sdt.innerHTML = ''
                            check_date.innerHTML = 'Vui lòng nhập ngày vào làm'
                        } else {
                            check_date.innerHTML = '';
                            var max_mapq = localStorage.getItem('max_mapq').slice(2);
                            var max_mamk = localStorage.getItem('max_mamk').slice(2);
                            var dataPost = {
                                MANV: 'NV' + (Number(max_ma) + 1),
                                TENNV: tennv.value,
                                GIOITINH: gioitinh.value,
                                CHUCVU: chucvu.value,
                                NGAYVAOLAM: date.value,
                                DIACHI: diachi.value,
                                SDT: sdt.value,
                                TENPQ: phanquyen.value,
                                MATKHAU: matkhau.value,
                                TENUSER: tenuser.value,
                                MAPQ: 'PQ' + (Number(max_mapq) + 1),
                                MAMK: 'MK' + (Number(max_mamk) + 1)
                            };

                            fetch(url_themNV, {
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
            }
        }
    }
}