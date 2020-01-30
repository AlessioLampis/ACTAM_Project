
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

var xd = new Tone.MembraneSynth({
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

xd.toMaster();
bd.toMaster();
cymbal.toMaster();
Tone.context.latencyHint = 'fastest';
Tone.context.lookAhead = 0;
