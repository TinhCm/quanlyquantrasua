var login = document.querySelector('.login');
var logout = document.querySelector('.logout');
console.log(document.cookie);


if (document.cookie != "") {
    login.classList.add('display');
    logout.classList.add('display_none')
} else {
    login.classList.remove('display');
    logout.classList.remove('display_none')
}

//Logout
logout.onclick = function() {
    var check_login = confirm("Bạn muốn đăng xuất")
    if (check_login === true) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var equals = cookies[i].indexOf("=");
            var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        location.href = "/index.html"
    }

}