$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

var url_khachHang = 'http://localhost:3000/getKhachHang';


function tao_ma() {
    fetch(url_khachHang, {
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
                    localStorage.setItem('max_makh', 0);
                } else {
                    data.map(function(khachHang) {
                        localStorage.setItem('max_makh', khachHang.MAKH);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
tao_ma()

fetch(url_khachHang, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {

        if (data.status == 401) {

        } else {

            var htmls = data.map(function(loc) {

                var day = new Date(loc.NGAYDK);
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
                            <div class="khacHang_content_center">
                                <div class="khacHang_center_left">
                                    <p><i class="fas fa-user"></i> ${loc.TENKH + ' - ' + loc.MAKH}</p>
                                </div>
                                <div class="khacHang_center_between">
                                    <p>${loc.SDT}</p>
                                </div>
                                <div class="khacHang_center_right">
                                    <p>${format_date}</p>
                                </div>
                                <div class="khacHang_center_right1">
                                    <p>${loc.TENLKH}</p>
                                </div>
                                 <div class="khacHang_center_right2">
                                    <p onclick ="
                                    localStorage.setItem('makh', '${loc.MAKH}');
                                            ">
                                    <a href = '/khachHang/suaKhachHang/suaKhachHang.html'><i class="fas fa-edit"></i></a></p>
                                </div>
                                <div class="khacHang_center_right2">
                                    <p><a href = '#'  onclick ="
                                                                var deleteNV = 'http://localhost:3000/deleteKhachHang';
                                                                        var dataPost = {
                                                                            MAKH: '${loc.MAKH}'  
                                                                        };
                                                                        fetch(deleteNV, {
                                                                            method: 'DELETE',
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                            },
                                                                            body: JSON.stringify(dataPost),
                                                                        })
                                                                        location.reload();
                                        
                                                                ")"
                                    ><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                            </div>
                        </li>
                            `
            })
            document.querySelector('.khachHang_content').innerHTML = htmls.join('');
        }
    })
    .catch((error) => {
        alert(error)
    });