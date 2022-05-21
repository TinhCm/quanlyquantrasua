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

var url_getFullSP = 'http://localhost:3000/getFullSP';

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
            var url_getSP = 'http://localhost:3000/getSanPham';
            fetch(url_getSP, {
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
                                var ca_right = document.querySelector('.ca_right');
                                ca_right.classList.add('display_none');
                                var htmls = data1.map(function(sanPham) {
                                    return `<li>
                                    <div class="ca_content_center">
                                        <div class="ca_center_left">
                                            <p><i style = "color:blue; padding-right: 10px" class="fas fa-coffee"></i>${sanPham.MAHH}</p>
                                        </div>
                                        <div class="ca_center_between">
                                            <p>${sanPham.TENHH}</p>
                                        </div>
                                        <div class="ca_center_right">
                                            <p>${sanPham.GIAHH + ' VND'}</p>
                                        </div>
                                        <div style="Display:block" class="ca_center_right2">
                                            <p onclick ="
                                            localStorage.setItem('mahh', '${sanPham.MAHH}');"
                                            ><a href="/sanPham/suaSanPham/suaSanPham.html"><i class="fas fa-edit"></i></a></p>
                                        </div>
                                        <div class="ca_center_right3">
                                            <p onclick ="
                                            var deleteNV = 'http://localhost:3000/deleteSanPham';
                                                    var dataPost = {
                                                        MAHH: '${sanPham.MAHH}'  
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
                                            ><a href=""><i class="fas fa-trash-alt"></i></a></p>
                                        </div>
                                    </div>
                                </li>`
                                })
                                document.querySelector('.ca_content').innerHTML = htmls.join('');
                            } else {
                                var htmls = data1.map(function(sanPham) {
                                    return `<li>
                                    <div class="ca_content_center">
                                        <div class="ca_center_left">
                                            <p><i style = "color:blue; padding-right: 10px" class="fas fa-coffee"></i>${sanPham.MAHH}</p>
                                        </div>
                                        <div class="ca_center_between">
                                            <p>${sanPham.TENHH}</p>
                                        </div>
                                        <div class="ca_center_right">
                                            <p>${sanPham.GIAHH + ' VND'}</p>
                                        </div>
                                        <div style="Display:block" class="ca_center_right2">
                                            <p></p>
                                        </div>
                                        <div class="ca_center_right3">
                                            <p</p>
                                        </div>
                                    </div>
                                </li>`
                                })
                                document.querySelector('.ca_content').innerHTML = htmls.join('');
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