$(function() {
    $("#header").load("/header/header.html");
    $("#footer").load("/footer/footer.html");
});
//Xử lí động
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, 450)

    function updateNumber() {
        if (currentNumber >= finalNumber) {
            clearInterval(interval)
        } else {
            let inc = Math.ceil(finalNumber / (duration / 450))
            if (currentNumber + inc > finalNumber) {
                currentNumber = finalNumber
                clearInterval(interval)
            } else {
                currentNumber += inc
            }
            callback(currentNumber)
        }
    }
}

function animateNumber2(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, 17)

    function updateNumber() {
        if (currentNumber >= finalNumber) {
            clearInterval(interval)
        } else {
            let inc = Math.ceil(finalNumber / (duration / 17))
            if (currentNumber + inc > finalNumber) {
                currentNumber = finalNumber
                clearInterval(interval)
            } else {
                currentNumber += inc
            }
            callback(currentNumber)
        }
    }
}


animateNumber(4, 3000, 0, function(number) {
    const formattedNumber = number.toLocaleString()
    document.querySelector('.introduce_store_block1').innerText = formattedNumber
})

animateNumber2(99, 3000, 0, function(number) {
    const formattedNumber = number.toLocaleString()
    document.querySelector('.introduce_store_block2').innerText = formattedNumber + '+'
})

animateNumber(1, 3000, 0, function(number) {
    const formattedNumber = number.toLocaleString()
    document.querySelector('.introduce_store_block3').innerText = formattedNumber
})

animateNumber2(100, 3000, 0, function(number) {
    const formattedNumber = number.toLocaleString()
    document.querySelector('.introduce_store_block4').innerText = formattedNumber + "%"
})


var introduce_store = document.querySelector('.introduce_store');
introduce_store.onclick = function() {
    animateNumber(4, 3000, 0, function(number) {
        const formattedNumber = number.toLocaleString()
        document.querySelector('.introduce_store_block1').innerText = formattedNumber
    })

    animateNumber2(99, 3000, 0, function(number) {
        const formattedNumber = number.toLocaleString()
        document.querySelector('.introduce_store_block2').innerText = formattedNumber + '+'
    })

    animateNumber(1, 3000, 0, function(number) {
        const formattedNumber = number.toLocaleString()
        document.querySelector('.introduce_store_block3').innerText = formattedNumber
    })

    animateNumber2(100, 3000, 0, function(number) {
        const formattedNumber = number.toLocaleString()
        document.querySelector('.introduce_store_block4').innerText = formattedNumber + "%"
    })
}