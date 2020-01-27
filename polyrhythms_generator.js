
///
//**THINGS TO DO**//
///
//FIX THE SOUNDS!!
// 1 FIX BUG WITH COSET (WHEN ACTIVATES, ALL THE PIES GET CRAZY)
// 2 ADD SHIFTING IN COSET
// 3 MAKE THE COSET PLAY
// 4 stop the coset when changes are appied on it
// 5 CHANGE THE SOUNDS 
// 6 ADD ANOTHER SET OF SOUNDS
// FIX ANIMATION OF PIES
// 7 Fix positioning and add transition between pages, especially the first page's shadow
// 8 START TO DEVELOP POLYMETER SECTION
// Sometimes pies stop to rotate
// set bpm range or set slow and fast tempo
// examples with music sheets

///
//**MODEL**//
///


//  Timing variables 
let start = 0;
let end = 0;
var counter = 0; //Maybe we should add another one
const tm = document.querySelector("#bpm") 
var bpm = Math.floor(tm.value);


//Tatum for every page (right now, we use only tatum1 for cross ryhthm)
var tatum = { tatum1: 1, tatum2: 1, tatum3: 1 }; //LCM of each page

//NAVIGATE THROUGHT PAGE variables
var CurrentPage = 0; //page where you are 
var selectors = document.querySelectorAll("button"); //

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
//let CrossLoop = new Tone.Loop(play, "4n");
//CrossLoop.start(0);

var seq_host;

var seq_guest;

var seq_guest_timing;

seq_guest = new Tone.Sequence(function(time, note){
  cymbal.triggerAttackRelease(note, "8n", time);
//modulation of duration
}, ["C5", "C5" , "C5" , "C5"], (60*host_accents/Tone.Transport.bpm.value)/guest_accents);

seq_host = new Tone.Sequence(function(time, note){
  bd.triggerAttackRelease(note, "8n", time);
//straight quater notes
}, ["F4", "F4" , "F4" , "F4"], Tone.Time("4n").toSeconds());

var animation_host = new Tone.Loop(function(time){
  Tone.Draw.schedule(function(){
    play_host();
  }, time)
}, "4n");

var animation_guest = new Tone.Loop(function(time){
  Tone.Draw.schedule(function(){
    play_guest();
  }, time)
}, "4n");



//Pop's circle animation (not used yet)
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

//CANVAS VARIABLES
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


var sub = 6; //number of tatum
var guest_accents = 3; // guest value
var host_accents = 2; // host value
var alpha_guest = 2 * Math.PI /guest_accents ; //angle of tatum reperesentation
var alpha_host = 2 * Math.PI /host_accents ; //angle of tatum reperesentation
var guest_beats = []; // guest array for tatum representation
var host_beats = []; //host array for tatum representation
var free_guest_beats = [];
var free_host_beats = [];
var free_coset_beats = [];
var coset = false; //whether the coset is on or off
var N = 2; //number used for animate with or without  coset
var coset_beat = []; // coset array used in tatum representaion
var coset_accents = guest_accents; // coset accents
var s = 1; //switch of the coset
var theta_guest = 0;
var theta_host =0;

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
  document.querySelector("#togglebtn").textContent = "Stop";
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

  if (guest.value < 0){
    alert("Guest value must be positive");
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
  if (host.value < 0){
    alert("Host value must be positive");
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
  //tatum_calculation();
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
  //tatum_calculation();
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
  //tatum_calculation();
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

function animate_guest({ timing, draw, duration }) { //animate function of DrawPie

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
  theta_guest += alpha_guest;
  theta_guest = theta_guest % (2 * Math.PI);

};

function animate_host({ timing, draw, duration }) { //animate function of DrawPie

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
  theta_host += alpha_host;
  theta_host = theta_host % (2 * Math.PI);

};

//DRAW GUEST AND HOST IN CROSS RHYTHM

function drawPie_guest(progress) {  //GUEST PIE
  guest_beats.forEach((beat, i) => {
    ctx.beginPath();
    ctx.lineWidth = "1.5";
    ctx.strokeStyle = "#dce1d5";
    ctx.moveTo(x0, y0);
    //ctx.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha_guest + i * alpha_guest + progress * alpha_guest + theta_guest;
    ctx.arc(x0, y0, rad, gamma, gamma + alpha_guest);
    ctx.lineTo(x0, y0);
    ctx.fillStyle = i == 0 ? "yellow" : beat ? "red" : "black";
    ctx.fill();
    ctx.stroke();
  });
};

function drawPie_host(progress) {  //HOST PIE
  host_beats.forEach((beat, j) => {
    ctx2.beginPath();
    ctx2.lineWidth = "1.5";
    ctx2.strokeStyle = "#dce1d5";
    ctx2.moveTo(x1, y1);
    //ctx2.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha_host + j * alpha_host + progress * alpha_host + theta_host;
    ctx2.arc(x1, y1, rad2, gamma, gamma + alpha_host);
    ctx2.lineTo(x1, y1);
    ctx2.fillStyle = j == 0 ? "yellow" : beat ? "red" : "black";
    ctx2.fill();
    ctx2.stroke();
  });
}


function drawPie_free_guest(progress) {  //GUEST PIE
  free_guest_beats.forEach((beat, i) => {
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

function drawPie_free_host(progress) {  //HOST PIE
  free_host_beats.forEach((beat, j) => {
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
  if (coset == false) { //if N is 2, coset is disabled. It means that theta angle
    N = 3;              // goes +alpha/N (because it is called two times during a rotation)
  }
  else {
    N = 2; //when coset is added, animate function is called 3 times, so theta
  };       // must be +alpha/3
};



function drawPie_coset(progress) {
  
  free_coset_beat.forEach((beat, j) => {
    ctx3.beginPath();
    ctx3.lineWidth = "1.5";
    ctx3.strokeStyle = "#dce1d5";
    ctx3.moveTo(x1, y1);
    //ctx2.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3 / 2) * Math.PI - (5 / 2) * alpha + j * alpha + progress * alpha + theta + s*alpha;
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
  guest_accents = Math.floor(guest1.value); 
  host_accents = Math.floor(host1.value);
  coset_accents = guest_accents;
  alpha_guest = 2 * Math.PI / guest_accents;
  alpha_host= 2 * Math.PI / host_accents;

  Tone.Transport.bpm.value = bpm;
  //array with tatum
  guest_beats = []; 
  host_beats = [];
  coset_beat = [];
  //array with no tatum
  free_guest_beats = [];
  free_host_beats = [];
  free_coset_beats = [];
  
 // create the array for the tatum_representation (with subdivision)
  for (var i = 0; i < sub; i++) {
    i % guest_accents == 0 ? guest_beats.push(true) : guest_beats.push(false);
  };

  for (var j = 0; j < sub; j++) {
    j % host_accents == 0 ? host_beats.push(true) : host_beats.push(false);
  };

  for (var x = 0; x < sub; x++) {
    x % coset_accents == 0 ? coset_beat.push(true) : coset_beat.push(false);
  };

  for(var y = 0; y < guest_accents; y++) {
    free_guest_beats.push(true);
  };

  for(var z = 0; z < guest_accents; z++) {
    free_host_beats.push(true);
  };
};

//PLAY FUNCTION

function play_guest(time) {
 
  animate_guest({ timing: backEaseOut, draw: drawPie_guest, duration: (30007*host_accents/Tone.Transport.bpm.value)/guest_accents });
  
  if (coset == true) {
    animate({ timing: backEaseOut, draw: drawPie_coset, duration: (30005) / (Tone.Transport.bpm.value) });
  };
};

function play_host(time) {
  animate_host({ timing: backEaseOut, draw: drawPie_host, duration: (60000) / (Tone.Transport.bpm.value) });
}



/////
//**CONTROLLER**//
////

//trying to fix the problem while reload
//document.addEventListener('DOMContentLoaded', function(event) { document.getElementsByClassName("page")[0].style.display = "none"});
document.documentElement.addEventListener('mousedown', function(){
  if (Tone.context.state !== 'running') Tone.context.resume();
});

document.getElementById("startbtn").onclick = function () {
  
  Tone.start();
  ShowPage(3);
  calculate_pie();
  seq_guest = new Tone.Sequence(function(time, note){
    bd.triggerAttackRelease(note, "8n", time);
  //modulation of duration
  }, ["C5", "C5" , "C5" , "C5"], (60*host_accents/Tone.Transport.bpm.value)/guest_accents);
  
  seq_host.start(); //no delay in 
  seq_guest.start();

  //animation_host.start();
  //animation_guest.start();
  
 // animation_guest.interval = (60*host_accents/Tone.Transport.bpm.value + 0.01)/guest_accents + "s";
  Tone.Transport.start();
  end = performance.now();
  console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("togglebtn").onclick = function () {
  if (document.querySelector("#togglebtn").textContent == "Stop") {
    document.querySelector("#togglebtn").textContent = "Start";

    seq_host.stop();
    seq_guest.stop();
  
    //animation_host.stop();
    //animation_guest.stop();  
  }
  else {
    
  document.querySelector("#togglebtn").textContent = "Stop"
    seq_host.start();
    seq_guest.start();
  
    //animation_host.start();
    //animation_guest.start();

    
    
  }
 

  
  
};

document.getElementById("backbtn").onclick = function () {
if (document.querySelector("#togglebtn").textContent == "Stop") {
  ShowPage(0);

  seq_host.stop();//no delay
  seq_guest.stop();
  //animation_host.stop();
  //animation_guest.stop(); 
  seq_guest.delete();
  Tone.Transport.stop()
}
else{
  ShowPage(0);
}
   
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
 //CHANGE OF BPM
tm.onchange = function () {
  bpm = Math.floor(tm.value);
  Tone.Transport.bpm.value = bpm;
};



