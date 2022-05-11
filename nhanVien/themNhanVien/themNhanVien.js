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


function tao_ma() {
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
                data.map(function(nhanVien) {
                    setCookie("max_ma", nhanVien.MANV, 365);
                })
            }

        })
        .catch((error) => {
            alert(error)
        });
}

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

var check_manv = document.querySelector('.check_manv');
var check_tennv = document.querySelector('.check_tennv');
var check_diachi = document.querySelector('.check_diachi');
var check_matkhau = document.querySelector('.check_matkhau');
var check_sdt = document.querySelector('.check_sdt');

var max_ma = getCookie('max_ma').slice(3);
manv.value = 'Mã nhân viên: NV0' + (Number(max_ma) + 1)

var url_themNV = 'http://localhost:3000/postNV'

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
                if (sdt.value === '') {
                    check_sdt.innerHTML = 'Vui lòng nhập số điện thọai'
                } else {
                    check_sdt.innerHTML = ''
                    var dataPost = {
                        MANV: 'NV0' + (Number(max_ma) + 1),
                        TENNV: tennv.value,
                        GIOITINH: gioitinh.value,
                        CHUCVU: chucvu.value,
                        NGAYVAOLAM: date.value,
                        DIACHI: diachi.value,
                        SDT: sdt.value,
                        PHANQUYEN: phanquyen.value,
                        MATKHAU: matkhau.value
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
                            setTimeout(() => {
                                tao_ma();
                                location.reload();
                            }, 1000);
                        })
                        .catch((error) => {
                            alert('Có lỗi xảy ra')
                        });
                }
            }
        }
    }
}