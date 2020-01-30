
import { calculate_pie, hostBeats, guestBeats, sub, guest1, host1 } from "./polyr.mjs"

///
//**MODEL**//
///


//  Timing variables 
let start = 0;
let end = 0;
const tm = document.querySelector("#bpm")
var bpm = Math.floor(tm.value);


//NAVIGATE THROUGHT PAGE variables
var CurrentPage = 0; //page where you are 
var selectors = document.querySelectorAll("button"); //

//PAGE NUMBER 0 variable
let Btn = document.getElementsByClassName("firstbtn");


//SOUNDS: TONE.JS SETUP


var seq_guest;
var seq_host;

var animation_host = new Tone.Loop(function (time) {
    Tone.Draw.schedule(function () {
        play_host();
    }, time)
}, "4n");

var animation_guest = new Tone.Loop(function (time) {
    Tone.Draw.schedule(function () {
        play_guest();
    }, time)
}, "4n");

var polyrhythmLoop = new Tone.Loop(
    function (time) {
        let i = 0;
        if (i == 0) {
            //play tutto
        }
        if (hostBeats[i]) {
            //play and animate host Tone.Draw.schedule...
        }
        if (guestBeats[i]) {
            //play and animate beat Tone.Draw.schedule...
        }
    }

)

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
var theta_guest = 0;
var theta_host = 0;
var alpha_guest = 2 * Math.PI / guest_accents; //angle of tatum reperesentation
var alpha_host = 2 * Math.PI / host_accents;
var coset = false; //whether the coset is on or off

var guest_accents = 3; // guest value
var host_accents = 2; // host value

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

//HELPER

let helper = true;
var elementList = [guest1, host1, result];



elementList.forEach(function (element) {
    if (helper == true) {
        if (element == guest1) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarGuest");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            });
        };

        if (element == host1) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarHost");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
            );
        }
        if (element == result) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarTatum");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
            );
        }




    };
});












//DRAW COSET IN CROSS RHYTHM

function check_coset() {  //Change the N in animate function
    if (coset == false) { //if N is 2, coset is disabled. It means that theta angle
        N = 3;              // goes +alpha/N (because it is called two times during a rotation)
    }
    else {
        N = 2; //when coset is added, animate function is called 3 times, so theta
    };       // must be +alpha/3
};




/////
//**CONTROLLER**//
////

//trying to fix the problem while reload
//document.addEventListener('DOMContentLoaded', function(event) { document.getElementsByClassName("page")[0].style.display = "none"});
document.documentElement.addEventListener('mousedown', function () {
    if (Tone.context.state !== 'running') Tone.context.resume();
});

document.getElementById("startbtn").onclick = function () {
    alpha_guest = 2 * Math.PI / guest_accents; //angle of tatum reperesentation
    alpha_host = 2 * Math.PI / host_accents;
    Tone.start();
    ShowPage(3);
    calculate_pie();


    seq_guest = new Tone.Sequence(function (time, note) {
        xd.triggerAttackRelease(note, "8n", time);

    }, notes_guest, (60 * host_accents / Tone.Transport.bpm.value) / guest_accents);

    seq_host = new Tone.Sequence(function (time, note) {
        bd.triggerAttackRelease(note, "8n", time);
        //straight quater notes
    }, notes_host, "4n");



    seq_host.start(); //no delay in 
    seq_guest.start();

    animation_host.start();
    animation_guest.start();

    animation_guest.interval = (60 * host_accents / Tone.Transport.bpm.value) / guest_accents + "s";
    animation_host.interval = "4n";

    Tone.Transport.start("+1");


    end = performance.now();
    console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("togglebtn").onclick = function () {
    if (document.querySelector("#togglebtn").textContent == "Stop") {

        document.querySelector("#togglebtn").textContent = "Start";

        seq_host.stop();
        seq_guest.stop();

        animation_host.stop();
        animation_guest.stop();
    }
    else {

        document.querySelector("#togglebtn").textContent = "Stop"
        seq_host.start();
        seq_guest.start();

        animation_host.start();
        animation_guest.start();



    }

};

document.getElementById("backbtn").onclick = function () {

    Tone.Transport.stop();
    ShowPage(0);
    seq_host.stop();
    seq_guest.stop();
    animation_host.stop();
    animation_guest.stop();

    if (document.querySelector("#togglebtn").textContent == "Stop") {
        ShowPage(0);

        seq_host.stop();
        seq_guest.stop();
        animation_host.stop();
        animation_guest.stop();

        Tone.Transport.stop()
    }
    else {
        ShowPage(0);
    }
};

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

