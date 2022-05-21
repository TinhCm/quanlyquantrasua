function show() {
    var pswrd = document.getElementById('pswrd');
    var icon = document.querySelector('.fa-lock');
    if (pswrd.type === "password") {
        pswrd.type = "text";
        pswrd.style.marginTop = "20px";
        icon.style.color = "#7f2092";
    } else {
        pswrd.type = "password";
        icon.style.color = "grey";
    }
}

// Login

var login_name = document.querySelector('.login_name');
var login_pass = document.querySelector('.login_pass');
var login_sent = document.querySelector('.login_sent');

var login_name_false = document.querySelector('.login_name_false');
var login_pass_false = document.querySelector('.login_pass_false');
var login_sent_false = document.querySelector('.login_sent_false');

login_sent.onclick = function() {
    function login() {

        var url_user = 'http://localhost:3000/getNV';
        fetch(url_user, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                var check_name = data.find(function(users) {
                    return users.TENUSER === login_name.value;
                })

                if (typeof check_name != 'undefined') {
                    if (check_name.MATKHAU == login_pass.value) {
                        login_sent_false.innerHTML = "Đăng nhập thành công"
                        setTimeout(() => {
                            location.href = "/index.html"
                        }, 1000);

                        function setCookie(cname, cvalue, exdays) {
                            const d = new Date();
                            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                            let expires = "expires=" + d.toUTCString();
                            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                        }
                        setCookie("ten", check_name.TENNV, 365);
                        setCookie("ma", check_name.MANV, 365);
                    } else {
                        login_sent_false.innerHTML = "Tên đăng nhập hoặc mật khẩu sai"
                    }
                } else {
                    login_sent_false.innerHTML = "Tài khoản không tồn tại"
                }
            })
            .catch((error) => {});

    }
    login();
}