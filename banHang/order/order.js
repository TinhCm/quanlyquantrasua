$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


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

var mahdbh = document.querySelector('.mahdbh');
var tennv = document.querySelector('.tennv');
var thoigian = document.querySelector('.thoigian');
var SL = document.querySelector('.SL');
var giamSL = document.querySelector('.giamSL');
var tangSL = document.querySelector('.tangSL');
var luuSP = document.querySelector('.luuSP');
var listSP = document.querySelector('.listSP')
var listKH = document.querySelector('.listKH')
var sanPhamDaChon = document.querySelector('.sanPhamDaChon')
var tenkh = document.querySelector('.tenkh')
var loaikh = document.querySelector('.loaikh');
var giamgia = document.querySelector('.giamgia');
var ngaylapHD = document.querySelector('.ngaylapHD')
var tongtien = document.querySelector('.tongtien')
var tongsanpham = document.querySelector('.tongsanpham')
var tiengiam = document.querySelector('.tiengiam')
var thanhtien = document.querySelector('.thanhtien');

tennv.innerHTML = `<b>Nhân viên: </b>` + getCookie('ten')
thoigian.innerHTML = `<b>Time: </b>` + new Date().getHours() + ':' + new Date().getMinutes() + ":" + new Date().getSeconds();
var soluong = 1;

giamSL.onclick = function() {
    SL.innerHTML = Number(SL.innerHTML) - 1;
}

tangSL.onclick = function() {
    SL.innerHTML = Number(SL.innerHTML) + 1;
}


var url_maxMa = 'http://localhost:3000/getMaxMa';

function max_MAHDBH() {
    fetch(url_maxMa, {
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
                    localStorage.setItem('max_mahdbh', 0);;
                    localStorage.setItem('mahdbh', `HDBH` + 0);
                } else {
                    data.map(function(banHang) {
                        localStorage.setItem('max_mahdbh', banHang.MAHDBH);
                        var maxHDBH = banHang.MAHDBH.slice(4);
                        localStorage.setItem('mahdbh', `HDBH` + (Number(maxHDBH) + 1));
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
max_MAHDBH();

function getListSP() {
    var url_listSP = 'http://localhost:3000/getSanPham';
    fetch(url_listSP, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {

                var htmls = data.map(function(sanPham) {

                    return `
                            <option value="${sanPham.MAHH}"> ${sanPham.TENHH}</option>
                            `
                })
                document.querySelector('.listSP').innerHTML = htmls.join('');
            }

        })
        .catch((error) => {
            alert(error)
        });
}
getListSP();


function getListKH() {
    var url_listKH = 'http://localhost:3000/getKhachHang';
    fetch(url_listKH, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {

                var htmls = data.map(function(khachHang) {
                    return `
                            <option value="${khachHang.MAKH}"> ${khachHang.TENKH}</option>
                            `
                })
                document.querySelector('.listKH').innerHTML = htmls.join('');
            }

        })
        .catch((error) => {
            alert(error)
        });
}
getListKH();


function getSPCHON() {
    var url_listSPCHON = 'http://localhost:3000/getHoaDon';
    fetch(url_listSPCHON, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.status == 401) {

            } else {
                var loc = data.filter(function(hoaDon) {
                    return hoaDon.MAHDBH === localStorage.getItem('mahdbh');
                })

                var loc1 = data.find(function(hoaDon) {
                    return hoaDon.MAHDBH === localStorage.getItem('mahdbh');
                })
                tenkh.innerHTML = `Tên khách hàng: ` + loc1.TENKH;

                if (loc1.MALKH == 'LKH2') {
                    loaikh.innerHTML = 'Loại khách hàng: VIP';
                    giamgia.innerHTML = 'Giảm giá: 20%'
                    localStorage.setItem('giamgia', 20)
                } else {
                    loaikh.innerHTML = 'Loại khách hàng: Thường';
                    giamgia.innerHTML = 'Giảm giá: 0%'
                    localStorage.setItem('giamgia', 0)
                }

                var htmls = loc.map(function(hoaDon) {
                    return `
                            <li>
                            <div class="banHang_header">
                                <div class="banHang_header1">
                                    <p>${hoaDon.TENHH}</p>
                                </div>
                                <div class="banHang_header2">
                                    <p>${hoaDon.SOLUONG}</p>
                                </div>
                                <div class="banHang_header3">
                                    <p>${hoaDon.GIAHH}</p>
                                </div>
                                <div class="banHang_header4">
                                    <p>${hoaDon.SOLUONG * hoaDon.GIAHH}</p>
                                </div>
                                <div class="banHang_header4">
                                    <p onclick ="

                                    var deleteNV = 'http://localhost:3000/deleteBanHang';
                                            var dataPost = {
                                                MAHDBH: '${hoaDon.MAHDBH}',
                                                MAHH:   '${hoaDon.MAHH}'
                                            };
                                            fetch(deleteNV, {
                                                method: 'DELETE',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(dataPost),
                                            })
                                            
                                            getSPCHON();
                                            xuatHD();
            
                                    ")"
                                    ><a><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                            </div>
                        </li>
                                `
                })
                document.querySelector('.sanPhamDaChon').innerHTML = htmls.join('');
            }
        })
        .catch((error) => {
            // alert(error)
        });
}


function taoCTBH() {
    luuSP.onclick = function() {
        taoHoaDonBH();
        taoCTBH()
        mahdbh.value = localStorage.getItem('mahdbh')


        var url_GiaSP = 'http://localhost:3000/getGiaSP';
        fetch(url_GiaSP, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {

                if (data.status == 401) {

                } else {

                    var loc1 = data.find(function(sanPham) {
                        return sanPham.MAHH === listSP.value;
                    })

                    var dataPost = {
                        MAHDBH: localStorage.getItem('mahdbh'),
                        MAHH: listSP.value,
                        THANHTIEN: Number(SL.innerHTML) * loc1.GIAHH,
                        SOLUONG: SL.innerHTML
                    };

                    var url_postHoaDon = 'http://localhost:3000/postCTBH';
                    fetch(url_postHoaDon, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dataPost),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            suaHoaDonBH();
                        })
                        .catch((error) => {
                            alert(error)
                        });
                    getSPCHON();
                    xuatHD();
                }

            })
            .catch((error) => {
                alert(error)
            });

    }
}
taoCTBH();

function taoHoaDonBH() {

    var dataPost = {
        MAHDBH: localStorage.getItem('mahdbh'),
        MANV: getCookie('ma'),
        NGAYHDBH: new Date(),
        TONGTIEN: 0,
        MAKH: listKH.value
    };

    var url_postHSBH = 'http://localhost:3000/postHDBH';
    fetch(url_postHSBH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost),
        })
        .then((response) => response.json())
        .then((data) => {

        })
        .catch((error) => {
            alert(error)
        });
}

function suaHoaDonBH() {
    var url_getHD2 = 'http://localhost:3000/getHoaDon2';
    fetch(url_getHD2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status == 401) {

            } else {

                var loc = data.find(function(hoaDon) {
                    return hoaDon.MAHDBH == localStorage.getItem('mahdbh');
                })

                var dataPost = {
                    MAHDBH: localStorage.getItem('mahdbh'),
                    TONGTIEN: Number(loc.TONGTIEN),
                };

                var url_putHDBH = 'http://localhost:3000/putHDBH';
                fetch(url_putHDBH, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataPost),
                    })
                    .then((response) => response.json())
                    .then((data) => {

                    })
                    .catch((error) => {
                        // alert(error)
                    });
            }

        })
        .catch((error) => {
            // alert(error)
        });

}


function xuatHD() {
    var url_getHD2 = 'http://localhost:3000/getHoaDon2';
    fetch(url_getHD2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status == 401) {

            } else {
                var loc = data.find(function(hoaDon) {
                    return hoaDon.MAHDBH === localStorage.getItem('mahdbh');
                })

                var day = new Date(loc.NGAYHDBH);
                var get_day = (day.getUTCDate())
                var get_month = (day.getUTCMonth() + 1);
                if (get_day < 10) {
                    get_day = '0' + get_day;
                }
                if (get_month < 10) {
                    get_month = '0' + get_month;
                }

                var format_date = get_day + '/' + get_month + '/' + day.getFullYear();
                ngaylapHD.innerHTML = 'Ngày lập hóa đơn: ' + format_date;
                tongtien.innerHTML = 'Tổng tiền: ' + loc.TONGTIEN + ' VND';
                tongsanpham.innerHTML = 'Tổng số sản phẩm: ' + loc.TONGSP + ' Ly'
                tiengiam.innerHTML = 'Giảm giá: ' + loc.TONGTIEN * (Number(localStorage.getItem('giamgia')) / 100) + ' VND';
                thanhtien.innerHTML = 'TỔNG TIỀN THANH TOÁN: ' + (loc.TONGTIEN - (loc.TONGTIEN * (Number(localStorage.getItem('giamgia')) / 100))) + ' VND'
            }

        })
        .catch((error) => {
            // alert(error)
        });
}


var thanhToanHD = document.querySelector('.thanhToanHD');
thanhToanHD.onclick = function() {
    localStorage.removeItem('mahdbh');
    localStorage.removeItem('max_mahdbh');
    location.reload()
    suaHoaDonBH()
}