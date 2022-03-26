window.onload = function() {
    slider();
}

$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});

//Silde
var slide_box = document.getElementsByClassName('slide-box')

var i;
for (i = 0; i < slide_box.length; i++) {
    slide_box[i].style.width = document.body.clientWidth + "px";
}

function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    if (elem.movement) clearTimeout(elem.movement);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);

    if (xpos == final_x && ypos == final_y) return true;

    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";

    var repeat = "moveElement('" + elementID + "'," + final_x + ", " + final_y + ", " + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

function previous() {
    if (move < 0) move += box_width;
    moveElement('slider', move, 0, 10);
}

function next() {
    move = (move <= endpos) ? 0 : (move - box_width);
    moveElement('slider', move, 0, 10);
}

function slider() {
    if (!document.getElementById) return false;
    var slider = document.getElementById('slider');
    var wrap_slider = document.getElementById('wrap-slider');

    if (!slider.style.position) slider.style.position = "absolute";
    if (!slider.style.left) slider.style.left = "0px";
    if (!slider.style.top) slider.style.top = "0px";

    var box_arr = slider.childNodes;
    var box_quantity = 0;
    for (var i = 0; i < box_arr.length; i++) {
        if (box_arr[i].className == 'slide-box') {
            box_quantity++;
            box_width = box_arr[i].offsetWidth;
            box_height = box_arr[i].offsetHeight;
        }
    }

    wrap_slider.style.height = box_height + "px";
    wrap_slider.style.width = document.body.clientWidth + "px";
    slider.style.width = (box_width * box_quantity) + "px";
    move = 0;
    endpos = -(box_width * 3);

    var idSet = setInterval('next()', 5000);
    var next_slide = document.getElementById("next-slide");
    var prev_slide = document.getElementById("prev-slide");

    next_slide.onclick = function() {
        next();
        clearInterval(idSet);
        idSet = setInterval('next()', 5000);
    }
    prev_slide.onclick = function() {
        previous();
        clearInterval(idSet);
        idSet = setInterval('next()', 5000);
    }
}