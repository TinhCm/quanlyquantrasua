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
            var url_getNCC = 'http://localhost:3000/getNCC';
            fetch(url_getNCC, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((data1) => {
                    if (data1.status == 401) {

                    } else {

                        if (data1 == '') {
                            localStorage.setItem('max_mancc', 0);
                        } else {
                            data1.map(function(ncc) {
                                localStorage.setItem('max_mancc', ncc.MANCC);
                            })
                        }

                        var check_name = data.find(function(users) {
                            return users.MANV === getCookie('ma');
                        })

                        try {
                            if (check_name.TENPQ === true) {
                                var ca_right = document.querySelector('.ca_right');
                                ca_right.classList.add('display_none');
                                var htmls = data1.map(function(ncc) {
                                    return `
                                            <li>
                                                <div class="ca_content_center">
                                                    <div class="ca_center_left">
                                                        <p><i style = "color: blue; padding-right:10px" class="fas fa-user-friends"></i>${ncc.TEN}</p>
                                                    </div>
                                                    <div class="ca_center_between">
                                                        <p>${ncc.DIACHI}</p>
                                                    </div>
                                                    <div class="ca_center_right">
                                                        <p>${ncc.SDT}</p>
                                                    </div>
                
                                                    <div style="Display:block" class="ca_center_right2">
                                                        <p
                                                        onclick ="
                                                                    localStorage.setItem('mancc', '${ncc.MANCC}');"
                                                        ><a href= "/nhaCungCap/suaNCC/suaNCC.html"><i class="fas fa-edit"></i></a></p>
                                                    </div>
                                                    <div class="ca_center_right3">
                                                        <p
                                                        onclick ="
                                                                            var deleteNV = 'http://localhost:3000/deleteNCC';
                                                                                    var dataPost = {
                                                                                        MANCC: '${ncc.MANCC}'  
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
                                                        ><a href = "#"><i class="fas fa-trash-alt"></i></a></p>
                                                    </div>
                                                </div>
                                            </li>
                                            `
                                })
                                document.querySelector('.ca_content').innerHTML = htmls.join('');
                            } else {
                                var htmls = data1.map(function(ncc) {
                                    return `
                                            <li>
                                                <div class="ca_content_center">
                                                    <div class="ca_center_left">
                                                        <p><i style = "color: blue; padding-right:10px" class="fas fa-user-friends"></i>${ncc.TEN}</p>
                                                    </div>
                                                    <div class="ca_center_between">
                                                        <p>${ncc.DIACHI}</p>
                                                    </div>
                                                    <div class="ca_center_right">
                                                        <p>${ncc.SDT}</p>
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