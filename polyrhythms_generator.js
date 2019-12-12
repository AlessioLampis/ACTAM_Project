var guest = document.getElementById("guest");
var host = document.getElementById("host");
var tatum = 1;
var guest_circle = { tatum: 16 };
var host_circle = { tatum: 16 };
var canvas = document.getElementById('stage');
const container = document.getElementById("guest_circle_on_screen");


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
        var radius = 45 * Math.abs(Math.cos(angle));
        ctx.arc(50, 50, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        angle += pixelsPerFrame / 20;
        requestAnimationFrame(drawCircle);


        ctx.fillStyle = "#006699";
        ctx.fill();

    }
}




guest.onchange = function () {
    document.getElementById("guest").value = guest.value;
    tatum_calculation();
    if (guest.value > 36) {
        guest.value = 36;
        alert("Guest value can't exceed 36");
    }


}

host.onchange = function () {
    document.getElementById("host").value = host.value;
    tatum_calculation();
    if (host.value > 36) {
        host.value = 36;
        alert("Host value can't exceed 36")
    }
}

function tatum_calculation() {
    tatum = host.value * guest.value;
    result.innerHTML = tatum;
    guest_circle.tatum = tatum;
    host_circle.tatum = tatum;

}

function show_tatum() {

    if (guest_circle_on_screen.childElementCount != 0) {
        circles = container.querySelectorAll(".sub");
        circles.forEach((circle) => circle.remove())
    }
    ;
    for (var x = 0; x < tatum; x++) {
        add_circle()
    }
}

function add_circle() {
    el = document.createElement("div")
    el.classList.add("sub")
    guest_circle_on_screen.appendChild(el)
}


StartButton.onclick = function () {
    show_tatum();
    drawCircle()
};

