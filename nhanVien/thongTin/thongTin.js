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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var url_user = 'http://localhost:3000/getNV';

function tao_ma() {
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
                data.map(function(nhanVien) {
                    setCookie("max_ma", nhanVien.MANV, 365);
                })
            }

        })
        .catch((error) => {
            alert(error)
        });
}
tao_ma();

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

            var check_name = data.find(function(users) {
                return users.MANV === getCookie('ma');
            })

            var thongTin_right = document.querySelector('.thongTin_right');

            try {
                if (check_name.PHANQUYEN === true) {
                    thongTin_right.classList.add('display_none');

                    var htmls = data.map(function(nhanVien) {
                        return `<li class = "demo_code">
                                <div class = "thongtin_content_header">
                                    <h3><i class="fas fa-user"></i> ${nhanVien.TENNV}</h3>
                                    <a
                                    onclick ="
                                            location.href = '/nhanVien/suaNhanVien/suaNhanVien.html'
                                            setCookie('edit_ma', '${nhanVien.MANV}', 365)
                                            "class = "thongtin_content_edit"><h2><i class="fas fa-edit"></i> Chỉnh sửa</h2></a>
                                </div>
                                <h4> ${nhanVien.CHUCVU} </h4>
                                <div style="display: flex;">
                                    <div class="thongtin_content_left">
                                        <p>Mã nhân viên: ${nhanVien.MANV}</p>
                                        <p>Địa chỉ: ${nhanVien.DIACHI}</p>  
                                        <p>Số điện thoại: ${nhanVien.SDT}</p>
                                        <p>Phân quyền: ${nhanVien.PHANQUYEN}</p>
                                    </div>
                                    <div class="thongtin_content_right">
                                        <p>Giới tính: ${nhanVien.GIOITINH}</p>
                                        <p>Ngày vào làm: ${nhanVien.NGAYVAOLAM}</p>
                                        <p>Mật khẩu: ${nhanVien.MATKHAU}</p>
                                        <button onclick ="
                                                            var deleteNV = 'http://localhost:3000/deleteNV';
                                                                    var dataPost = {
                                                                        MANV: '${nhanVien.MANV}'  
                                                                    };
                                                                    fetch(deleteNV, {
                                                                        method: 'DELETE',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                        },
                                                                        body: JSON.stringify(dataPost),
                                                                    })
                                                                    location.reload();
                                    
                                                            ")">Xóa</button>
                                    </div>
                                </div>
                            </li>`
                    })
                    document.querySelector('.thongtin_content').innerHTML = htmls.join('');
                } else {

                    var loc = data.filter(function(users) {
                        return users.MANV === getCookie('ma');
                    })

                    var htmls = loc.map(function(nhanVien) {
                        return `<li class = "">
                                <div class = "thongtin_content_header">
                                    <h3><i class="fas fa-user"></i> ${nhanVien.TENNV}</h3>
                                </div>
                                <h4> ${nhanVien.CHUCVU} </h4>
                                <div style="display: flex;">
                                    <div class="thongtin_content_left">
                                        <p>Mã nhân viên: ${nhanVien.MANV}</p>
                                        <p>Địa chỉ: ${nhanVien.DIACHI}</p>
                                        <p>Số điện thoại: ${nhanVien.SDT}</p>
                                    </div>
                                    <div class="thongtin_content_right">
                                        <p>Giới tính: ${nhanVien.GIOITINH}</p>
                                        <p>Ngày vào làm: ${nhanVien.NGAYVAOLAM}</p>
                                    </div>
                                </div>
                                
                            </li>`
                    })
                    document.querySelector('.thongtin_content').innerHTML = htmls.join('');
                }
            } catch (error) {

            }

        }

    })
    .catch((error) => {
        alert(error)
    });

console.log(document.cookie);
document.cookie = "demo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";