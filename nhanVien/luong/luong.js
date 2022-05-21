$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});


// Chi tiết lương
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
            var url_getLuongNV = 'http://localhost:3000/getLuongNV';
            fetch(url_getLuongNV, {
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
                                            <li>
                                            <div style="border-bottom:none" class="luong_content_center">
                                                <div class="luong_center_left">
                                                    <p><i class="fas fa-user"></i>${loc.TENNV}</p>
                                                </div>
                                                <div class="luong_center_between">
                                                    <p>${loc.TONG + ' VND'}</p>
                                                </div>
                                                <div class="luong_center_right">
                                                    <p>${loc.TONGCA + ' ca'}</p>
                                                </div>
                                                <div class="luong_center_right">
                                                    <p>${loc.TONGGIO + ' giờ'}</p>
                                                </div>
                                                <div class="luong_center_right">
                                                    <p>${loc.HESOLUONG}</p>
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
                                    <div style="border-bottom:none" class="luong_content_center">
                                        <div class="luong_center_left">
                                            <p><i class="fas fa-user"></i>${loc.TENNV}</p>
                                        </div>
                                        <div class="luong_center_between">
                                            <p>${loc.TONG + ' VND'}</p>
                                        </div>
                                        <div class="luong_center_right">
                                            <p>${loc.TONGCA + ' ca'}</p>
                                        </div>
                                        <div class="luong_center_right">
                                            <p>${loc.TONGGIO + ' giờ'}</p>
                                        </div>
                                        <div class="luong_center_right">
                                            <p>${loc.HESOLUONG}</p>
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

            var url_getLuong = 'http://localhost:3000/getLuong';

            fetch(url_getLuong, {
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
                                    tongLuong = tongLuong + loc.THANHTIEN
                                    var day = new Date(loc.GIOBD);
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
                                                    <p><i class="fas fa-user"></i> ${loc.TENNV}</p>
                                                </div>
                                                <div class="luong_center_between">
                                                    <p>${loc.TENCLV + ' ' + format_date}</p>
                                                </div>  
                                                <div class="luong_center_right">
                                                    <p>${loc.HESOLUONG}</p>
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
                                    tongLuong = tongLuong + loc.THANHTIEN
                                    var day = new Date(loc.GIOBD);
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
                                                        <p><i class="fas fa-user"></i> ${loc.TENNV}</p>
                                                    </div>
                                                    <div class="luong_center_between">
                                                        <p>${loc.TENCLV + ' ' + format_date}</p>
                                                    </div>  
                                                    <div class="luong_center_right">
                                                        <p>${loc.HESOLUONG}</p>
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