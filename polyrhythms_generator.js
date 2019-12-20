var guest = document.getElementById("guest");
var host = document.getElementById("host");
var tatum = 1;
const container = document.getElementById("guest_circle_on_screen");
var tatum_elements = [];
var host_colors = [];
var guest_colors = [];

var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
var pixelsPerFrame = 5;
var angle = Math.PI / 2;

//TATUM

guest.onchange = function() {
  document.getElementById("guest").value = Math.floor(guest.value);
  if (guest.value > 8) {
    guest.value = 8;
    alert("Guest value can't exceed 8");
  }
  if (guest.value == 0) {
    guest.value = 1;
  }
  tatum_calculation();
};

host.onchange = function() {
  document.getElementById("host").value = Math.floor(host.value);

  if (host.value > 8) {
    host.value = 8;
    alert("Host value can't exceed 8");
  }
  if (host.value == 0) {
    host.value = 1;
  }
  tatum_calculation();
};

function tatum_calculation() {
  tatum = lcm_two_numbers(Math.floor(host.value), Math.floor(guest.value));
  result.innerHTML = tatum;
}

function lcm_two_numbers(x, y) {
  if (x == 0) {
    x = 1;
  }
  if (y == 0) {
    y = 1;
  }
  if (typeof x !== "number" || typeof y !== "number") return false;
  return Math.abs(x * y / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

//START
document.body.onkeydown = function(e) {
  if (e.key == "s") {
    create_circle_host();
    drawCircle();
  }
};

//CIRCLE

function set_tatum(x, y) {
  host_colors = [];
  guest_colors = [];
  host_colors.push("black");
  guest_colors.push("black");
  for (var i = 0; i < tatum; i++) {
    if (i == guest.value) {
    }
  }
}

//ANIMATION

function create_circle_host() {
  tatum_elements = [];

  for (var i = 0; i < tatum; i++) {
    tatum_elements.push(false);
  }
}

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

//myChart.animating : true;
//myChart.data.datasets[0].data
//myChart.destroy();
//myChart.clear();
/*
ctx.beginPath();
ctx.moveTo(x0, y0);
ctx.arc(x0, y0, rad, -Math.PI/2 + 2*alpha, -Math.PI/2 + 3*alpha);
ctx.moveTo(x0, y0);
ctx.fillStyle = "orange";
ctx.fill();
*/
