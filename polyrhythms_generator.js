var guest = document.getElementById("guest1");
var host = document.getElementById("host1");
var tatum = { tatum1: 1, tatum2: 1, tatum3: 1 };
const container = document.getElementById("guest_circle_on_screen");
var host_colors = [];
var guest_colors = [];
var CurrentPage = 0;
var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
var pixelsPerFrame = 5;
var angle = Math.PI / 2;

//BACKGROUND
let Btn = document.getElementsByClassName("firstbtn");
Btn[0].onclick = function(){ document.getElementsByClassName("page")[0].style.display = "block"; document.getElementsByClassName("page")[0].classList.add("animate-in");
setTimeout(function(){document.getElementsByClassName("page")[0].classList.remove("animate-in");
                      
}, 600);
document.getElementsByClassName("firstpage")[0].style.display = "none"};

//VIEW PAGE

function ShowPage(n) {
  guest = document.getElementById("guest" + (n + 1));
  host = document.getElementById("host" + (n + 1));
  var x = document.getElementsByClassName("page");
  var buttons = document.getElementsByTagName("button");
  x[CurrentPage].style.display = "none";
//buttons[CurrentPage].style.backgroundColor = "";
  CurrentPage = n;
  x[n].style.display = "block";
  //buttons[n].style.backgroundColor = "blue";
};

var selectors = document.querySelectorAll("button");
selectors[0].style.background = "black";
selectors[0].style.color = "#dce1d5";

function color_button(event){
  selectors.forEach(reset_buttons);
  if(event.target.className == "LinBtn"){
    ShowPage(0);
    selectors[0].style.background = "black";
    selectors[0].style.color = "#dce1d5";
  };
  if(event.target.className == "IrrBtn"){
    ShowPage(1);
    selectors[4].style.background = "black";
    selectors[4].style.color = "#dce1d5";
  };
  if(event.target.className == "ClvBtn"){
    ShowPage(2);
    selectors[8].style.background = "black";
    selectors[8].style.color = "#dce1d5";
  };
  
};

function reset_buttons(selector){
  selector.style.background ="#dce1d5" ;
selector.style.color = "black";
};

function select_button(selector){
  selector.onclick = color_button;
};

selectors.forEach(select_button);

//TATUM
guest.onchange = function() {
  document.getElementById("guest" + (CurrentPage + 1)).value = Math.floor(
    guest.value
  );
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
  document.getElementById("host" + (CurrentPage + 1)).value = Math.floor(
    host.value
  );

  if (host.value > 8) {
    host.value = 8;
    alert("Host value can't exceed 8");
  }
  if (host.value == 0) {
    host.value = 1;
  }
  tatum_calculation();
};

guest2.onchange = function() {
  document.getElementById("guest" + (CurrentPage + 1)).value = Math.floor(
    guest.value
  );
  if (guest.value > 8) {
    guest.value = 8;
    alert("Guest value can't exceed 8");
  }
  if (guest.value == 0) {
    guest.value = 1;
  }
  tatum_calculation();
};

host2.onchange = function() {
  document.getElementById("host" + (CurrentPage + 1)).value = Math.floor(
    host.value
  );

  if (host.value > 8) {
    host.value = 8;
    alert("Host value can't exceed 8");
  }
  if (host.value == 0) {
    host.value = 1;
  }
  tatum_calculation();
};

guest3.onchange = function() {
  document.getElementById("guest" + (CurrentPage + 1)).value = Math.floor(
    guest.value
  );
  if (guest.value > 8) {
    guest.value = 8;
    alert("Guest value can't exceed 8");
  }
  if (guest.value == 0) {
    guest.value = 1;
  }
  tatum_calculation();
};

host3.onchange = function() {
  document.getElementById("host" + (CurrentPage + 1)).value = Math.floor(
    host.value
  );

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
  tatum["tatum" + (CurrentPage + 1)] = lcm_two_numbers(
    Math.floor(host.value),
    Math.floor(guest.value)
  );
  result[CurrentPage].innerHTML = tatum["tatum" + (CurrentPage + 1)];
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
