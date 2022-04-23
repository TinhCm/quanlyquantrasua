$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

var thongtin_content = document.querySelector('.thongtin_content');
if (document.cookie != "") {
    thongtin_content.classList.add('display_none')
}