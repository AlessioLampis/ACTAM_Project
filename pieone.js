
///
//**MODEL**//
///

let start = 0;
let end = 0;
var data = {};


var bd = new Tone.MembraneSynth({
  pitchDecay:0.05,
  octaves: 4,
  oscillator : {
    type :"fmsine",
    phase: 140,
    modulationType: "sine",
    modulationIndex:0.8,
    partials: [1] //1,0.1,0.01,0.01
  },
  envelope :{
    attack:0.01,
    decay :0.74,
    sustain: 0.71,
    release: 0.05,
    attackCurve :"exponential"
  }
});

var cymbal = new Tone.MetalSynth({
frequency  : 800 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5
});

bd.toMaster();
cymbal.toMaster();



var counter = 0;
const tm = document.querySelector("#bpm")
var bpm = tm.value;
tm.onchange = function(){
  bpm = tm.value;
  Tone.Transport.bpm.value = bpm;
};


/////
//**ANIMATION FUNCTIONS**//
////

function animate({ timing, draw, duration }) {
  
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
  theta += alpha/2;
  theta = theta % (2 * Math.PI);
}

var theta = 0;

function drawPie(progress) {
  beats.forEach((beat, i) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    //ctx.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3/2)*Math.PI - (5/2)*alpha + i * alpha  + progress * alpha + theta ;
    ctx.arc(x0, y0, rad, gamma, gamma + alpha);
    ctx.lineTo(x0, y0);
    ctx.fillStyle = i == 0 ? "yellow" : beat ? "red" : "white";
    ctx.fill();
    ctx.stroke();
  });
};

function drawPie2(progress) {
  beats2.forEach((beat, j) => {
    ctx2.beginPath();
    ctx2.moveTo(x1, y1);
    //ctx2.lineTo(x0+rad*Math.sin(i*alpha), y0-rad*Math.cos(i*alpha));
    var gamma = (3/2)*Math.PI - (5/2)*alpha + j * alpha  + progress * alpha + theta ;
    ctx2.arc(x1, y1, rad2, gamma, gamma + alpha);
    ctx2.lineTo(x1, y1);
    ctx2.fillStyle = j == 0 ? "yellow" : beat ? "red" : "white";
    ctx2.fill();
    ctx2.stroke();
  });
}

/// TIMING FUNCTIONS  ///

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
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

var backEaseOut = makeEaseOut(back);
var elEaseOut = makeEaseOut(elastic);
var linEaseOut = makeEaseOut(linear);


///
/***  PIE ANIMATION ***/
///

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas2.getContext('2d');


var x0 = canvas.width / 2;
var y0 = canvas.height / 2;
var x1 = canvas2.width/2;
var y1 = canvas2.height/2;
var rad = 100;
var rad2 = 100;


var sub = 6;
var accents = 3;
var accents2 = 2;
var alpha = 2 * Math.PI / sub;
var beats = [];
var beats2 = [];

for (var i = 0; i < sub; i++) {
  i % accents == 0 ? beats.push(true) : beats.push(false);
};

for (var j = 0; j < sub; j++) {
  j % accents2 == 0 ? beats2.push(true) : beats2.push(false);
};



///
//** PLAY FUNCTION **//
///


function play(time){
  Tone.start();
  animate({ timing: backEaseOut, draw: drawPie, duration: (60000)/(bpm*accents2) });
  animate({ timing: backEaseOut, draw: drawPie2, duration: (60000)/(bpm*accents2) });
  
  if(beats[counter%sub]){
     bd.triggerAttackRelease("c2",0.1 , time);
    
  };
  if(beats2[counter%sub]){
    cymbal.triggerAttackRelease("c2",0.1 , time);
  };
  
  counter = counter +1;
};

let loopKick = new Tone.Loop(play, "4n");
loopKick.start(0);


document.getElementById("Btn").onclick = function(){
  Tone.start();
    Tone.Transport.toggle();
    end = performance.now();
    console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};









