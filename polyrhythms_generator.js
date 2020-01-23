
///
//**THINGS TO DO**//
///
// FIX BUG WITH COSET (WHEN ACTIVATES, ALL THE PIES GET CRAZY)
// ADD SHIFTING IN COSET
// MAKE THE COSET PLAY
// CHANGE THE SOUNDS 
// ADD ANOTHER SET OF SOUNDS
// FIX ANIMATION OF PIES
// START TO DEVELOP POLYMETER SECTION





///
//**MODEL**//
///


//  Timing variables 
let start = 0;
let end = 0;
var counter = 0;
const tm = document.querySelector("#bpm")
var bpm = Math.floor(tm.value);
tm.onchange = function () {
  bpm = Math.floor(tm.value);
  Tone.Transport.bpm.value = bpm * Math.floor(host1.value);
};


//Tatum for every page (right now, we use only tatum1 for cross ryhthm)
var tatum = { tatum1: 1, tatum2: 1, tatum3: 1 };

//NAVIGATE THROUGHT PAGE variables
var CurrentPage = 0;
var selectors = document.querySelectorAll("button");

//PAGE NUMBER 0 variable
let Btn = document.getElementsByClassName("firstbtn");

//Crossrhythm variables
var guest = document.getElementById("guest1");
var host = document.getElementById("host1");

//SOUNDS: TONE.JS SETUP

var bd = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 4,
  oscillator: {
    type: "fmsine",
    phase: 140,
    modulationType: "sine",
    modulationIndex: 0.8,
    partials: [1] //1,0.1,0.01,0.01
  },
  envelope: {
    attack: 0.01,
    decay: 0.74,
    sustain: 0.71,
    release: 0.05,
    attackCurve: "exponential"
  }
});

var cymbal = new Tone.MetalSynth({
  frequency: 800,
  envelope: {
    attack: 0.001,
    decay: 1.4,
    release: 0.2
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5
});

bd.toMaster();
cymbal.toMaster();

//Tone.js LOOP
let CrossLoop = new Tone.Loop(play, "4n");
CrossLoop.start(0);

//Pop's circle animation
const container = document.getElementById("guest_circle_on_screen");
var pixelsPerFrame = 5;
var angle = Math.PI / 2;

//animation setup
var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

//Animation of cross rhythm pies

var theta = 0;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('myCanvas3');
const ctx3 = canvas3.getContext('2d');
var x0 = canvas.width / 2;
var y0 = canvas.height / 2;
var x1 = canvas2.width / 2;
var y1 = canvas2.height / 2;
var x2 = canvas3.width / 2;
var y2 = canvas3.height / 2;
var rad = 100;
var rad2 = 100;
var rad3 = 100;
var sub = 6;
var accents = 3;
var accents2 = 2;
var alpha = 2 * Math.PI / sub;
var beats = [];
var beats2 = [];
var coset = false;
var N = 2;
var beatsCos = [];



/////
//**FUNCTIONS**//
////

//PAGE NUMBER 0: opening the website

Btn[0].onclick = function () {
  document.getElementsByClassName("page")[0].style.display = "block"; document.getElementsByClassName("page")[0].classList.add("animate-in");
  setTimeout(function () {
    document.getElementsByClassName("page")[0].classList.remove("animate-in");

  }, 600);
  document.getElementsByClassName("firstpage")[0].style.display = "none"
};

//VIEW PAGES: navigate throught the website

selectors[0].style.background = "black"; //First selection of buttons
selectors[0].style.color = "#dce1d5";

// Function that allow to switch page
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

//Function that color the button of the page selected
function color_button(event) {
  selectors.forEach(reset_buttons);
  if (event.target.className == "LinBtn") {
    ShowPage(0);
    selectors[0].style.background = "black";
    selectors[0].style.color = "#dce1d5";
  };
  if (event.target.className == "IrrBtn") {
    ShowPage(1);
    selectors[4].style.background = "black";
    selectors[4].style.color = "#dce1d5";
  };
  if (event.target.className == "ClvBtn") {
    ShowPage(2);
    selectors[8].style.background = "black";
    selectors[8].style.color = "#dce1d5";
  };

};

function reset_buttons(selector) {
  selector.style.background = "#dce1d5";
  selector.style.color = "black";
};

function select_button(selector) {
  selector.onclick = color_button;
};

selectors.forEach(select_button);

//TATUMS 

//CROSS RHYTHM TATUM Calculation
guest.onchange = function () { //Guest value input
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

host.onchange = function () { //Host value input
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

//POLYMETER Tatum

guest2.onchange = function () { //N1 Numerator of rhythm number 1
  document.getElementById("guest" + (CurrentPage + 1)).value = Math.floor(
    guest.value
  );
  if (guest.value > 8) { //To change but I don't know how
    guest.value = 8;
    alert("Guest value can't exceed 8"); // to change in "20(?)"
  }
  if (guest.value == 0) {
    guest.value = 1;
  }
  //tatum_calculation(); No tatum calculation but a function that calculate the 
};

host2.onchange = function () { // D1 Denumerator of rhythm number 2
  document.getElementById("host" + (CurrentPage + 1)).value = Math.floor(
    host.value
  );

  if (host.value > 8) { // To change: it can be only 2, 4, 8 and 16
    host.value = 8;
    alert("Host value can't exceed 8");
  }
  if (host.value == 0) {
    host.value = 1;
  }
  tatum_calculation();
};

guest3.onchange = function () { //N2 Numerator of rhythm 2
  document.getElementById("guest" + (CurrentPage + 1)).value = Math.floor(
    guest.value
  );
  if (guest.value > 8) { //Same as N1
    guest.value = 8;
    alert("Guest value can't exceed 8");
  }
  if (guest.value == 0) {
    guest.value = 1;
  }
  tatum_calculation();
};

host3.onchange = function () {  // D2 Denominator of rhythm 2
  document.getElementById("host" + (CurrentPage + 1)).value = Math.floor(
    host.value
  );

  if (host.value > 8) {  //Same as D2
    host.value = 8;
    alert("Host value can't exceed 8");
  }
  if (host.value == 0) {
    host.value = 1;
  }
  tatum_calculation();
};


// Cross Rhythm Tatum calculation

function tatum_calculation() { //Only for Cross Rhythm
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

//ANIMATION of POP Circle (not used yet)

function drawCircle() {
  if (angle <= Math.PI) { //try to apply on canvas when they start to play
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

//ANIMATION: PIES OF CROSS RHYTHM

function animate({ timing, draw, duration }) { //animate function

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
      /*theta += alpha;
      theta = theta%(2*Math.PI);*/
    }

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
  theta += alpha / N; //N is 2 when coset is disabled, 3 when is enabled
  theta = theta % (2 * Math.PI);
}

//DRAW GUEST AND HOST IN CROSS RHYTHM

function drawPie(progress) {  //GUEST PIE
  beats.forEach((beat, i) => {
    ctx.beginPath();
    ctx.lineWidth = "1.5";
    ctx.strokeStyle = "#dce1d5";
    ctx.moveTo(x0, y0);
    //ctx.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha + i * alpha + progress * alpha + theta;
    ctx.arc(x0, y0, rad, gamma, gamma + alpha);
    ctx.lineTo(x0, y0);
    ctx.fillStyle = i == 0 ? "yellow" : beat ? "red" : "black";
    ctx.fill();
    ctx.stroke();
  });
};

function drawPie2(progress) {  //HOST PIE
  beats2.forEach((beat, j) => {
    ctx2.beginPath();
    ctx2.lineWidth = "1.5";
    ctx2.strokeStyle = "#dce1d5";
    ctx2.moveTo(x1, y1);
    //ctx2.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha + j * alpha + progress * alpha + theta;
    ctx2.arc(x1, y1, rad2, gamma, gamma + alpha);
    ctx2.lineTo(x1, y1);
    ctx2.fillStyle = j == 0 ? "yellow" : beat ? "red" : "black";
    ctx2.fill();
    ctx2.stroke();
  });
}


//DRAW COSET IN CROSS RHYTHM

function check_coset() {  //Change the N in animate function
  if (coset == false) {
    N = 2;
  }
  else {
    N = 3;
  };
};



function drawCoset(progress) {
  beatsCos.forEach((beat, j) => {
    ctx3.beginPath();
    ctx3.lineWidth = "1.5";
    ctx3.strokeStyle = "#dce1d5";
    ctx3.moveTo(x1, y1);
    //ctx2.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha + j * alpha + progress * alpha + theta;
    ctx3.arc(x1, y1, rad2, gamma, gamma + alpha);
    ctx3.lineTo(x1, y1);
    ctx3.fillStyle = j == 0 ? "yellow" : beat ? "red" : "black";
    ctx3.fill();
    ctx3.stroke();
  });
}


/// TIMING FUNCTIONS FOR ANIMATIONS ///

function back(timeFraction) {
  let x = 2.0;
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

function elastic(timeFraction) {
  let x = 0.3;
  return (
    Math.pow(2, 10 * (timeFraction - 1)) *
    Math.cos(20 * Math.PI * x / 3 * timeFraction)
  );
}

function linear(timeFraction) {
  return timeFraction;
}

// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

var backEaseOut = makeEaseOut(back);
var elEaseOut = makeEaseOut(elastic);
var linEaseOut = makeEaseOut(linear);



function calculate_pie() {
  sub = tatum["tatum1"];
  accents = Math.floor(guest1.value);
  accents2 = Math.floor(host1.value);
  alpha = 2 * Math.PI / sub;
  Tone.Transport.bpm.value = bpm * Math.floor(host1.value);
  beats = [];
  beats2 = [];

  var cosaccents = accents2;

  for (var i = 0; i < sub; i++) {
    i % accents == 0 ? beats.push(true) : beats.push(false);
  };

  for (var j = 0; j < sub; j++) {
    j % accents2 == 0 ? beats2.push(true) : beats2.push(false);
  };

  for (var x = 0; x < sub; x++) {
    j % cosaccents == 0 ? beatsCos.push(true) : beatsCos.push(false);
  };

};

//PLAY FUNCTION

function play(time) {

  animate({ timing: backEaseOut, draw: drawPie, duration: (60000) / (bpm) });
  animate({ timing: backEaseOut, draw: drawPie2, duration: (60000) / (bpm) });
  if (coset == true) {
    animate({ timing: backEaseOut, draw: drawCoset, duration: (60000) / (bpm) });
  };

  if (beats[counter % sub]) {
    bd.triggerAttackRelease("c2", 0.1, time);

  };
  if (beats2[counter % sub]) {
    cymbal.triggerAttackRelease("c2", 0.1, time);
  };

  counter = counter + 1;
};



/////
//**CONTROLLER**//
////


document.getElementById("startbtn").onclick = function () {

  Tone.start();
  ShowPage(3);
  calculate_pie();
  Tone.Transport.start();

  end = performance.now();
  console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("togglebtn").onclick = function () {
  if (document.querySelector("#togglebtn").textContent == "Stop") {
    document.querySelector("#togglebtn").textContent = "Start"
  }
  else {
    document.querySelector("#togglebtn").textContent = "Stop"
  }
  Tone.Transport.toggle();
};

document.getElementById("backbtn").onclick = function () {
  ShowPage(0);
  Tone.Transport.stop();
}

document.getElementById("coset_toggle").onclick = function () {
  check_coset();
  if (this.checked) {
    coset = true;
  }
  else {
    coset = false;
  }
}


