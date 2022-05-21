$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

var url_getSP = 'http://localhost:3000/getHangHoa';
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
tao_ma();

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
tao_maHDNH();

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

            try {
                var htmls = data.map(function(hangHoa) {
                    var day = new Date(hangHoa.NGAYHDNH);
                    var get_day = (day.getUTCDate())
                    var get_month = (day.getUTCMonth() + 1);
                    if (get_day < 10) {
                        get_day = '0' + get_day;
                    }
                    if (get_month < 10) {
                        get_month = '0' + get_month;
                    }
                    var format_date = get_day + '-' + get_month + '-' + day.getFullYear();

                    return `<li>
                    <div class="ca_content_center">
                        <div style="flex: 2;" class="ca_center_left">
                            <p><i style = "color: blue; padding-right: 10px" class="fas fa-utensils"></i>${hangHoa.TENHH}</p>
                        </div>
                        <div style="flex: 2;" class="ca_center_between">
                            <p>${hangHoa.TEN}</p>
                        </div>
                        <div style="flex: 2;" class="ca_center_between">
                            <p>${hangHoa.TENNV}</p>
                        </div>
                        <div style="flex: 1;" class="ca_center_right">
                            <p>${hangHoa.SOLUONG + ' ' + hangHoa.DONVI}</p>
                        </div>

                        <div class="ca_center_right2">
                            <p>${format_date}</p>
                        </div>

                        <div class="ca_center_right2">
                            <p>${hangHoa.GIAHH}</p>
                        </div>

                        <div style="Display:block" class="ca_center_right2">
                            <p
                            onclick ="
                            localStorage.setItem('mavt', '${hangHoa.MAHH}');
                            localStorage.setItem('mahdnh', '${hangHoa.MAHDNH}');"
                            ><a href="/hangHoa/suaHangHoa/suaHangHoa.html"><i class="fas fa-edit"></i></a></p>
                        </div>
                        <div style="flex: 0.6" class="ca_center_right3">
                            <p onclick ="
                            var deleteNV = 'http://localhost:3000/deleteSanPham';
                                    var dataPost = {
                                        MAHH: '${hangHoa.MAHH}'  
                                    };
                                    fetch(deleteNV, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(dataPost),
                                    })
                                    location.reload();
    
                            ")">
                            <a href=""><i class="fas fa-trash-alt"></i></a></p>
                        </div>
                        
                    </div>
                </li>`
                })
                document.querySelector('.ca_content').innerHTML = htmls.join('');
            } catch (error) {

            }

        }

    })
    .catch((error) => {
        alert(error)
    });