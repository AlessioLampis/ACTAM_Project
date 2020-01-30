var guest1 = document.getElementById("guest1");
var host1 = document.getElementById("host1");

var sub = 6; //number of tatum

var guestBeats = [];
var hostBeats = [];





//CROSS RHYTHM TATUM Calculation
guest1.onchange = function () { //Guest value input
    guest1.value = Math.floor(
      guest1.value
    );
  
    if (guest1.value > 8) {
      guest1.value = 8;
      alert("Guest value can't exceed 8");
    }
    if (guest1.value == 0) {
      guest1.value = 1;
    }
  
    if (guest1.value < 0){
      alert("Guest value must be positive");
      guest1.value = 1;
    }
    tatum_calculation();
  };
  
  host1.onchange = function () { //Host value input
    host1.value = Math.floor(
      host1.value
    );
  
    if (host1.value > 8) {
      host1.value = 8;
      alert("Host value can't exceed 8");
    }
    if (host1.value == 0) {
      host1.value = 1;
    }
    if (host1.value < 0){
      alert("Host value must be positive");
      host1.value = 1;
    }
    tatum_calculation();
  };

  function tatum_calculation() { //Only for Cross Rhythm
    sub = lcm_two_numbers(
      Math.floor(host1.value),
      Math.floor(guest1.value)
    );
    
  };

  
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
  

function calculate_pie() {

    guestBeats = [];
    hostBeats = [];
   
    for(var i = 0; i < sub; i ++){
        i%host1.value == 0 ? hostBeats.push(true) : hostBeats.push(false);
    };
  
  
    for(var y = 0; y < sub; y++) {
      y%guest1.value == 0 ? guestBeats.push(true) : guestBeats.push(false);
      
    };
  
  };

  export{calculate_pie,  hostBeats, guestBeats, sub, guest1, host1 }