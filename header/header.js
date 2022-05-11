var login = document.querySelector('.login');
var logout = document.querySelector('.logout');

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

if (getCookie('ma') != "") {
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
        document.cookie = "ten=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "ma=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "max_ma=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

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
var user = document.querySelector('.user');

if (getCookie('ten') != '') {
    user.innerHTML = `<i class="fas fa-home"></i> ${getCookie('ten')}`;
}