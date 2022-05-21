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

var url_getNCC = 'http://localhost:3000/getNCC';
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
                var check_name = data.find(function(users) {
                    return users.MANV === getCookie('ma');
                })

                try {
                    if (check_name.TENPQ === true) {
                        themNCC();
                        tao_ma();
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

function tao_ma() {
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
                if (data == '') {
                    localStorage.setItem('max_mancc', 0);
                } else {
                    data.map(function(ncc) {
                        localStorage.setItem('max_mancc', ncc.MANCC);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

var mancc = document.querySelector('.mancc')
var check_mancc = document.querySelector('.mancc')
var tenncc = document.querySelector('.tenncc')
var check_tenncc = document.querySelector('.check_tenncc')
var diachi = document.querySelector('.diachi')
var check_diachi = document.querySelector('.check_diachi')
var sdt = document.querySelector('.sdt')
var check_sdt = document.querySelector('.check_sdt')

var themCa = document.querySelector('.themCa');

function themNCC() {

    var max_mancc = localStorage.getItem('max_mancc').slice(3);
    mancc.value = 'Mã nhà cung cấp: NCC' + (Number(max_mancc) + 1);

    themCa.onclick = function() {

        if (tenncc.value === '') {
            check_tenncc.innerHTML = 'Vui lòng nhập tên nhà cung cấp';
        } else if (diachi.value === '') {
            check_tenncc.innerHTML = '';
            check_diachi.innerHTML = 'Vui lòng nhập địa chỉ';
        } else if (sdt.value === '') {
            check_diachi.innerHTML = '';
            check_sdt.innerHTML = 'Vui lòng nhập số điện thoại';
        } else {
            check_sdt.innerHTML = ''
        }

        var dataPost = {
            MANCC: 'NCC' + (Number(max_mancc) + 1),
            TEN: tenncc.value,
            DIACHI: diachi.value,
            SDT: sdt.value
        };

        var url_postNCC = 'http://localhost:3000/postNCC';
        fetch(url_postNCC, {
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