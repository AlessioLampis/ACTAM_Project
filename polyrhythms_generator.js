var guest = document.getElementById("guest");
var host = document.getElementById("host");
var tatum = 1;
var guest_circle = { tatum: 16 };
var host_circle = { tatum: 16 };
const container = document.getElementById("guest_circle_on_screen");

//ANIMATION

// Canvas
var canvas = document.getElementById('stage');

// 2d Drawing Context.
var ctx = canvas.getContext('2d');
var pixelsPerFrame = 5;
var angle = Math.PI / 2;

var StartButton = document.getElementById('StartButton');

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function drawCircle() {

    if (angle <= Math.PI) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        var radius = 15 * Math.abs(Math.cos(angle));
        ctx.arc(50, 50, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        angle += pixelsPerFrame / 20;
        requestAnimationFrame(drawCircle);


        ctx.fillStyle = "#006699";
        ctx.fill();

    }
}




guest.onchange = function () {
    document.getElementById("guest").value = Math.floor(guest.value);
    tatum_calculation();
    if (guest.value > 36) {
        guest.value = 36;
        alert("Guest value can't exceed 36");
    };
    if (guest.value == 0) {
        guest.value = 1;
    };



}

host.onchange = function () {
    document.getElementById("host").value = Math.floor(host.value);
    tatum_calculation();
    if (host.value > 36) {
        host.value = 36;
        alert("Host value can't exceed 36")
    };
    if (host.value == 0) {
        host.value = 1;
    };
}

function tatum_calculation() {
    tatum = lcm_two_numbers(Math.floor(host.value), Math.floor(guest.value));
    result.innerHTML = tatum;
    guest_circle.tatum = tatum;
    host_circle.tatum = tatum;

}

function lcm_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
};

function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
};


function show_tatum() {
    if (guest_circle_on_screen.childElementCount != 0) {
        circles = container.querySelectorAll(".sub");
        circles.forEach((circle) => circle.remove())
    };


    for (var x = 0; x < tatum; x++) {
        add_circle()
    }
};


function add_circle() {
    el = document.createElement("div")
    el.classList.add("sub")
    guest_circle_on_screen.appendChild(el)
};


StartButton.onclick = function () {
    show_tatum();
    drawCircle()
};




