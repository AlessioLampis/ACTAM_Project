
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
    free_guest_beats.forEach((beat, i) => {
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
    free_host_beats.forEach((beat, j) => {
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
  
  
  
  
  //PLAY FUNCTION
  
  function play_guest(time) {
   
    animate_guest({ timing: backEaseOut, draw: drawPie_guest, duration: (30000*host_accents/Tone.Transport.bpm.value)/guest_accents });
    
  };
  
  function play_host(time) {
    animate_host({ timing: backEaseOut, draw: drawPie_host, duration: (30000) / (Tone.Transport.bpm.value) });
  }
  
  
    