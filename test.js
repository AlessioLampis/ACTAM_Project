console.clear();

//var noise = new Tone.Noise("brown");
//var noise_gain = new Tone.Gain(0.04).toMaster();
//noise.connect(noise_gain);

var kick = new Tone.MembraneSynth();
var hat = new Tone.MetalSynth();

var closedHiHat = new Tone.NoiseSynth({
    volume : -10,
    filter : {
        Q : 1
    },
    envelope : {
        attack : 0.01,
        decay : 0.15
    },
    filterEnvelope : {
        attack : 0.01,
        decay : 0.03,
        baseFrequency : 4000,
        octaves : -2.5,
        exponent : 4,

    }
});

var openHiHat = new Tone.NoiseSynth({
    volume : -10,
    filter : {
        Q : 1
    },
    envelope : {
        attack : 0.01,
        decay : 0.3
    },
    filterEnvelope : {
        attack : 0.01,
        decay : 0.03,
        baseFrequency : 4000,
        octaves : -2.5,
        exponent : 4,
    }
});

var rev_gain = new Tone.Gain(0.2);
var reverb = new Tone.JCReverb(0.2);
var delay = new Tone.FeedbackDelay(0.5);
var gain = new Tone.Gain(0.9).toMaster();
var comp = new Tone.Compressor({
     ratio : 20 ,
     threshold : -50 ,
     release : 0.35 ,
     attack : 0.0003 ,
     knee : 30
}).toMaster();
//
//kick.chain(comp, reverb, gain );
reverb.chain(rev_gain, kick, gain);
kick.chain(reverb, gain);
closedHiHat.chain(gain, reverb, comp);
openHiHat.chain(gain, reverb, comp);
hat.chain(gain, reverb, comp);

//kick.toMaster();
Tone.context.latencyHint = 'playback';
//Tone.context.lookAhead = 0;
Tone.Transport.start();

function play(){
    reverb.triggerAttackRelease('C1','64n');
    //closedHiHat.triggerAttackRelease('8n');
}

function stop(){
  Tone.Transport.stop();
}