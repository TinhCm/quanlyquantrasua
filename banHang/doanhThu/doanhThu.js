$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});


// Chi tiết lương
var url_user = 'http://localhost:3000/getNV';

var loaiDoanhThu = document.querySelector('.loaiDoanhThu');
loaiDoanhThu.onchange = function() {

    if (loaiDoanhThu.value == 'doanhThu') {
        localStorage.setItem('hoaDon', 'http://localhost:3000/getHoaDon');
        localStorage.setItem('hoaDon2', 'http://localhost:3000/getHoaDon2');
        localStorage.setItem('doanhThu', 'http://localhost:3000/getDoanhThu');
        setTimeout(() => {
            location.reload()
        }, 1);
    } else if (loaiDoanhThu.value == 'thang') {
        localStorage.setItem('hoaDon', 'http://localhost:3000/getHoaDonThang');
        localStorage.setItem('hoaDon2', 'http://localhost:3000/getHoaDon2Thang');
        localStorage.setItem('doanhThu', 'http://localhost:3000/getDoanhThuThang');
        setTimeout(() => {
            location.reload()
        }, 1);
    } else if (loaiDoanhThu.value == 'tuan') {
        localStorage.setItem('hoaDon', 'http://localhost:3000/getHoaDonTuan');
        localStorage.setItem('hoaDon2', 'http://localhost:3000/getHoaDon2Tuan');
        localStorage.setItem('doanhThu', 'http://localhost:3000/getDoanhThuTuan');
        setTimeout(() => {
            location.reload()
        }, 1);
    }
}

var url_hoaDon = localStorage.getItem('hoaDon');
var url_getHD2 = localStorage.getItem('hoaDon2');
var url_getDT = localStorage.getItem('doanhThu');

function hoaDon() {
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
                fetch(url_getDT, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((data1) => {
                        if (data1.status == 401) {

                        } else {
                            var check_name = data.find(function(users) {
                                return users.MANV === getCookie('ma');
                            })

                            try {
                                if (check_name.TENPQ === true) {
                                    var htmls = data1.map(function(loc) {
                                        return `
                                    <i class="fas fa-wallet"></i> Tổng doanh thu: ${loc.TONGTIEN}
                                                `
                                    })
                                    document.querySelector('.doanhThu').innerHTML = htmls.join('');
                                } else {

                                }
                            } catch (error) {

                            }
                        }

                    })
                    .catch((error) => {
                        alert(error)
                    });


                fetch(url_getHD2, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((data1) => {
                        if (data1.status == 401) {

                        } else {
                            var check_name = data.find(function(users) {
                                return users.MANV === getCookie('ma');
                            })

                            try {
                                if (check_name.TENPQ === true) {
                                    var htmls = data1.map(function(loc) {
                                        var day = new Date(loc.NGAYHDBH);
                                        var get_day = (day.getDate())
                                        var get_month = (day.getMonth() + 1);
                                        if (get_day < 10) {
                                            get_day = '0' + get_day;
                                        }
                                        if (get_month < 10) {
                                            get_month = '0' + get_month;
                                        }
                                        var format_date = get_day + '/' + get_month + '/' + day.getFullYear();
                                        return `
                                        <li>
                                        <div class="luong_content_center">
                                            <div class="luong_center_left">
                                                <p>${loc.MAHDBH}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${format_date}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${loc.TONGTIEN + ' VND'}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${loc.TONGSP + ' Sản phẩm'}</p>
                                            </div>
                                        </div>
                                    </li>
                                                `
                                    })
                                    document.querySelector('.luong_content1').innerHTML = htmls.join('');
                                } else {

                                    var loc_ten = data1.filter(function(users) {
                                        return users.MANV === getCookie('ma');
                                    })

                                    var htmls = loc_ten.map(function(loc) {

                                        return `
                                    <li>
                                        <div class="luong_content_center">
                                            <div class="luong_center_left">
                                                <p>${loc.MAHDBH}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${format_date}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${loc.TONGTIEN + ' VND'}</p>
                                            </div>
                                            <div class="luong_center_between">
                                                <p>${loc.TONGSP + ' Sản phẩm'}</p>
                                            </div>
                                        </div>
                                    </li>
                                                `
                                    })
                                    document.querySelector('.luong_content1').innerHTML = htmls.join('');
                                }
                            } catch (error) {

                            }
                        }

                    })
                    .catch((error) => {
                        alert(error)
                    });


                fetch(url_hoaDon, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then((response) => response.json())
                    .then((data1) => {

                        if (data1.status == 401) {

                        } else {

                            var check_name = data.find(function(users) {
                                return users.MANV === getCookie('ma');
                            })

                            try {
                                if (check_name.TENPQ === true) {
                                    var tongLuong = 0;
                                    var htmls = data1.map(function(loc) {
                                        var day = new Date(loc.NGAYHDBH);
                                        var get_day = (day.getDate())
                                        var get_month = (day.getMonth() + 1);
                                        if (get_day < 10) {
                                            get_day = '0' + get_day;
                                        }
                                        if (get_month < 10) {
                                            get_month = '0' + get_month;
                                        }
                                        var format_date = get_day + '/' + get_month + '/' + day.getFullYear();

                                        return `
                                            <li>
                                                <div class="luong_content_center">
                                                    <div class="luong_center_right">
                                                        <p>${loc.MAHDBH}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENNV}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENKH}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENHH}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                    <p>${loc.SOLUONG}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${format_date}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${loc.GIAHH}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${loc.THANHTIEN + ' VND'}</p>
                                                    </div>
                                                </div>
                                        </li>
                                            `
                                    })
                                    document.querySelector('.luong_content').innerHTML = htmls.join('');
                                } else {

                                    var loc = data1.filter(function(users) {
                                        return users.MANV === getCookie('ma');
                                    })

                                    var htmls = loc.map(function(loc) {
                                        var day = new Date(loc.NGAYHDBH);
                                        var get_day = (day.getDate())
                                        var get_month = (day.getMonth() + 1);
                                        if (get_day < 10) {
                                            get_day = '0' + get_day;
                                        }
                                        if (get_month < 10) {
                                            get_month = '0' + get_month;
                                        }
                                        var format_date = get_day + '/' + get_month + '/' + day.getFullYear();
                                        return `
                                            <li>
                                                <div class="luong_content_center">
                                                    <div class="luong_center_right">
                                                        <p>${loc.MAHDBH}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENNV}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENKH}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENHH}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                    <p>${loc.SOLUONG}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${format_date}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${loc.GIAHH}</p>
                                                    </div>
                                                    <div class="luong_center_right">
                                                        <p>${loc.THANHTIEN + ' VND'}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        `
                                    })
                                    document.querySelector('.luong_content').innerHTML = htmls.join('');
                                }
                            } catch (error) {

                            }

                        }

                    })
                    .catch((error) => {
                        alert(error)
                    });

            }

        })
        .catch((error) => {
            alert(error)
        });
}
hoaDon();