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

var url_ca = 'http://localhost:3000/getCa';
var url_Topca = 'http://localhost:3000/getTopCa';

function tao_ma() {
    fetch(url_Topca, {
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
                    localStorage.setItem('max_maclv', 0);
                } else {
                    data.map(function(ca) {
                        localStorage.setItem('max_maclv', ca.MACLV);
                    })
                }
            }

        })
        .catch((error) => {
            alert(error)
        });
}
tao_ma()

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

            fetch(url_ca, {
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
                                var ca_right = document.querySelector('.ca_right');
                                ca_right.classList.add('display_none');

                                var htmls = data1.reverse().map(function(ca) {
                                    var d = new Date(ca.GIOBD);
                                    var layThu;
                                    switch (d.getUTCDay()) {
                                        case 0:
                                            var layThu = "Chủ nhật";
                                            break;
                                        case 1:
                                            var layThu = "Thứ hai";
                                            break;
                                        case 2:
                                            var layThu = "Thứ ba";
                                            break;
                                        case 3:
                                            var layThu = "Thứ tư";
                                            break;
                                        case 4:
                                            var layThu = "Thứ năm";
                                            break;
                                        case 5:
                                            var layThu = "Thứ sáu";
                                            break;
                                        case 6:
                                            var layThu = "Thứ bảy";
                                            break;
                                        default:
                                            break;
                                    }

                                    var get_BD = new Date(ca.GIOBD);
                                    var get_KT = new Date(ca.GIOKT);

                                    var get_gioBD = get_BD.getUTCHours();
                                    var get_phutBD = get_BD.getUTCMinutes();
                                    var get_giayBD = get_BD.getUTCSeconds();

                                    var get_gioKT = get_KT.getUTCHours();
                                    var get_phutKT = get_KT.getUTCMinutes();
                                    var get_giayKT = get_BD.getUTCSeconds();

                                    var format_time = get_gioBD + ':' + get_phutBD + ':' + get_giayBD + ' - ' + get_gioKT + ':' + get_phutKT + ':' + get_giayKT;

                                    return `
                                            <li>
                                            <div class="ca_content_center">
                                                <div class="ca_center_left">
                                                    <p>${layThu + ':'}  ${ca.TENCLV + ' ' +  format_time}</p>
                                                </div>
                                                <div class="ca_center_between">
                                                    <p> ${ca.TENNV}</p>
                                                </div>
                                                <div class="ca_center_right">
                                                    <p><a href="tel:${ca.SDT}"> ${ca.SDT} </a></p>
                                                </div>
                                                <div style = "Display:block" class="ca_center_right2">
                                                    <p onclick ="
                                                    localStorage.setItem('manv_ca', '${ca.MANV}');
                                                    localStorage.setItem('maclv', '${ca.MACLV}');"
                                                    ><a href= "/nhanVien/suaLichLam/suaLichLam.html"><i class="fas fa-edit"></i></a></p>
                                                </div>
                                                <div style = "Display:block" class="ca_center_right3">
                                                    <p><a href= "#"
                                                    onclick ="
                                                            var deleteNV = 'http://localhost:3000/deleteCa';
                                                                    var dataPost = {
                                                                        MACLV: '${ca.MACLV}'  
                                                                    };
                                                                    fetch(deleteNV, {
                                                                        method: 'DELETE',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                        },
                                                                        body: JSON.stringify(dataPost),
                                                                    })
                                                                    location.reload();
                                    
                                                            ")"><i class="fas fa-trash-alt"></i></a></p>
                                                </div>
                                            </div>
                                        </li>
                                            `
                                })
                                document.querySelector('.ca_content').innerHTML = htmls.join('');
                            } else {
                                var htmls = data1.map(function(ca) {
                                    var d = new Date(ca.GIOBD);
                                    var layThu;
                                    switch (d.getUTCDay()) {
                                        case 0:
                                            var layThu = "Chủ nhật";
                                            break;
                                        case 1:
                                            var layThu = "Thứ hai";
                                            break;
                                        case 2:
                                            var layThu = "Thứ ba";
                                            break;
                                        case 3:
                                            var layThu = "Thứ tư";
                                            break;
                                        case 4:
                                            var layThu = "Thứ năm";
                                            break;
                                        case 5:
                                            var layThu = "Thứ sáu";
                                            break;
                                        case 6:
                                            var layThu = "Thứ bảy";
                                            break;
                                        default:
                                            break;
                                    }

                                    var get_BD = new Date(ca.GIOBD);
                                    var get_KT = new Date(ca.GIOKT);

                                    var get_gioBD = get_BD.getUTCHours();
                                    var get_phutBD = get_BD.getUTCMinutes();
                                    var get_giayBD = get_BD.getUTCSeconds();

                                    var get_gioKT = get_KT.getUTCHours();
                                    var get_phutKT = get_KT.getUTCMinutes();
                                    var get_giayKT = get_BD.getUTCSeconds();

                                    var format_time = get_gioBD + ':' + get_phutBD + ':' + get_giayBD + ' - ' + get_gioKT + ':' + get_phutKT + ':' + get_giayKT;

                                    return `
                                            <li>
                                            <div class="ca_content_center">
                                                <div class="ca_center_left">
                                                    <p>${layThu + ':'} ${ca.TENCLV + ' ' +  format_time}</p>
                                                </div>
                                                <div class="ca_center_between">
                                                    <p>${ca.TENNV}</p>
                                                </div>
                                                <div class="ca_center_right">
                                                    <p><a href="tel:${ca.SDT}"> ${ca.SDT} </a></p>
                                                </div>
                                                <div style="Display:block" class="ca_center_right2">
                                                    <p></p>
                                                </div>
                                                <div class="ca_center_right3">
                                                    <p></p>
                                                </div>
                                            </div>
                                        </li>
                                            `
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