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
var url_getFullHDNH = 'http://localhost:3000/getFullHDNH';

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

function tao_maHDNH() {
    fetch(url_getFullHDNH, {
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
                    localStorage.setItem('max_mahdnh', 0);
                } else {
                    data.map(function(sanPham) {
                        localStorage.setItem('max_mahdnh', sanPham.MAHDNH);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}

function getItem() {
    var url_getNCC = 'http://localhost:3000/getNCC';
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
                var htmls = data.map(function(NCC) {

                    return `
                            <option value="${NCC.MANCC}">${NCC.MANCC + ' - ' + NCC.TEN}</option>
                            `
                })
                document.querySelector('.mancc').innerHTML = htmls.join('');
            }

        })
        .catch((error) => {
            alert(error)
        })

}

var mahh = document.querySelector('.mahh')
var tenhh = document.querySelector('.tenhh')
var giahh = document.querySelector('.giahh')
var mancc = document.querySelector('.mancc')
var sl = document.querySelector('.sl')
var ngaynhap = document.querySelector('.ngaynhap')
var donvi = document.querySelector('.donvi')

var check_mahh = document.querySelector('.check_mahh')
var check_tenhh = document.querySelector('.check_tenhh')
var check_giahh = document.querySelector('.check_giahh')
var check_mancc = document.querySelector('.check_mancc')
var check_sl = document.querySelector('.check_sl')
var check_ngaynhap = document.querySelector('.check_ngaynhap')
var check_donvi = document.querySelector('.check_donvi')

var themCa = document.querySelector('.themCa');

function themSP() {

    var max_mahh = localStorage.getItem('max_mahh').slice(2);
    var max_mahdnh = localStorage.getItem('max_mahdnh').slice(4);
    mahh.innerHTML = 'M?? h??ng h??a: HH' + (Number(max_mahh) + 1);

    themCa.onclick = function() {

        if (tenhh.value === '') {
            check_tenhh.innerHTML = 'Vui l??ng nh???p t??n h??ng h??a';
        } else if (sl.value === '') {
            check_tenhh.innerHTML = '';
            check_sl.innerHTML = 'Vui l??ng nh???p s??? l?????ng'
        } else if (giahh.value === '') {
            check_sl.innerHTML = '';
            check_giahh.innerHTML = 'Vui l??ng nh???p gi?? h??ng h??a'
        } else if (ngaynhap.value === '') {
            check_giahh.innerHTML = '';
            check_ngaynhap.innerHTML = 'Vui l??ng nh???p ng??y'
        } else if (donvi.value === '') {
            check_ngaynhap.innerHTML = '';
            check_donvi.innerHTML = 'Vui l??ng nh???p ????n v??? t??nh'
        } else {
            check_donvi.innerHTML = '';
            var dataPost = {
                MAHH: 'HH' + (Number(max_mahh) + 1),
                MANV: getCookie('ma'),
                MAHDNH: 'HDNH' + (Number(max_mahdnh) + 1),
                TENHH: tenhh.value,
                MALHH: 'LHH1',
                GIAHH: giahh.value,
                MANCC: mancc.value,
                SOLUONG: sl.value,
                NGAYHDNH: ngaynhap.value,
                DONVI: donvi.value
            };

            var url_postSP = 'http://localhost:3000/postHangHoa';
            fetch(url_postSP, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataPost),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("T???o th??nh c??ng")
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
                    tao_maHDNH();
                    getItem();
                    themSP();
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
check();