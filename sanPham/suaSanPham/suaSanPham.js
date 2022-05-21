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

var check_mahh = document.querySelector('.check_mahh')
var check_tenhh = document.querySelector('.check_tenhh')
var check_giahh = document.querySelector('.check_giahh')

var themCa = document.querySelector('.themCa');

var url_getSP = 'http://localhost:3000/getSanPham';
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
                        suaSP();
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
    fetch(url_getSP, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                if (data == '') {} else {
                    data.map(function(sanPham) {

                    })
                    var loc = data.find(function(sanPham) {
                        return sanPham.MAHH === localStorage.getItem('mahh');
                    })

                    tenhh.value = loc.TENHH;
                    giahh.value = loc.GIAHH;
                    mahh.innerHTML = 'Mã hàng hóa: ' + localStorage.getItem('mahh')
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

function suaSP() {

    themCa.onclick = function() {

        if (tenhh.value === '') {
            check_tenhh.innerHTML = 'Vui lòng nhập tên sản phẩm';
        } else if (giahh.value === '') {
            check_tenhh.innerHTML = '';
            check_giahh.innerHTML = 'Vui lòng nhập giá sản phẩm'
        }

        var dataPost = {
            MAHH: localStorage.getItem('mahh'),
            TENHH: tenhh.value,
            MALHH: 'LHH2',
            GIAHH: giahh.value,
            MANCC: 'NCC1'
        };

        var url_postSP = 'http://localhost:3000/putSanPham';
        fetch(url_postSP, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPost),
            })
            .then((response) => response.json())
            .then((data) => {
                alert("Lưu thành công")
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