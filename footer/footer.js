//Messenger
var chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute("page_id", "111652003905550");
chatbox.setAttribute("attribution", "biz_inbox");

window.fbAsyncInit = function() {
    FB.init({
        xfbml: true,
        version: 'v12.0'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Lấy danh sách email
function get_email() {
    var url_email = 'https://o3tea-api.glitch.me/email';
    fetch(url_email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            var footer1_right_email = document.querySelector('.footer1_right_email').value;
            var footer1_right2 = document.querySelector('.footer1_right2');
            var today = new Date();
            var date = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + '-' +
                today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

            var check_exist = data.some(function(emails) {
                return emails.email === footer1_right_email;
            })

            if (footer1_right_email === "") {
                footer1_right2.innerHTML = "Vui lòng nhập email!"
            } else if (check_exist == true) {
                footer1_right2.innerHTML = "Email đã tồn tại!"
            } else {

                var dataPost = {
                    email: footer1_right_email.toLowerCase(),
                    date: date,
                };
                fetch(url_email, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataPost),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        footer1_right2.innerHTML = "Đăng ký thành công!";
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    })
                    .catch((error) => {});

            }
        })
        .catch((error) => {});
}
//Run
var footer1_right_button = document.querySelector('.footer1_right_button');
footer1_right_button.onclick = function() {
    var footer1_right_email = document.querySelector('.footer1_right_email').value;
    var footer1_right2 = document.querySelector('.footer1_right2');
    if (footer1_right_email === "") {
        footer1_right2.innerHTML = "Vui lòng nhập email!"
    } else {
        footer1_right2.innerHTML = "Đang đăng ký...";
        get_email();
    }
}