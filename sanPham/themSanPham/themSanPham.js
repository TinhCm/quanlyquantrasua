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

var url_getSP = 'http://localhost:3000/getSanPham';
var url_getFullSP = 'http://localhost:3000/getFullSP';
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
                        themSP();
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
    fetch(url_getFullSP, {
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
                    localStorage.setItem('max_mahh', 0);
                } else {
                    data.map(function(sanPham) {
                        localStorage.setItem('max_mahh', sanPham.MAHH);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

var mahh = document.querySelector('.mahh')
var tenhh = document.querySelector('.tenhh')
var giahh = document.querySelector('.giahh')

var check_mahh = document.querySelector('.check_mahh')
var check_tenhh = document.querySelector('.check_tenhh')
var check_giahh = document.querySelector('.check_giahh')

var themCa = document.querySelector('.themCa');

function themSP() {

    var max_mahh = localStorage.getItem('max_mahh').slice(2);
    mahh.innerHTML = 'Mã sản phẩm: HH' + (Number(max_mahh) + 1);

    themCa.onclick = function() {

        if (tenhh.value === '') {
            check_tenhh.innerHTML = 'Vui lòng nhập tên sản phẩm';
        } else if (giahh.value === '') {
            check_tenhh.innerHTML = '';
            check_giahh.innerHTML = 'Vui lòng nhập giá sản phẩm'
        } else {
            check_giahh.innerHTML = '';
            var dataPost = {
                MAHH: 'HH' + (Number(max_mahh) + 1),
                TENHH: tenhh.value,
                MALHH: 'LHH2',
                GIAHH: giahh.value,
                MANCC: 'NCC1'
            };

            var url_postSP = 'http://localhost:3000/postSanPham';
            fetch(url_postSP, {
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