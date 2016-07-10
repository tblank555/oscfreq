
/**
 * @name oscfreq
 */

var t;

export function dsp(time) 
{
  t = time;
  var note_a = 220;
  var note_c = 261.63;
  var note_e = 329.63;
  
  var mixed = triple_osc(note_a) * 0.4 + triple_osc(note_c) * 0.4 + triple_osc(note_e) * 0.4
  var envelope = envelope_gen(0.001, 0.2);
  
  return mixed * envelope;
}

function osc(freq)
{
  return Math.sin(2 * Math.PI * t * freq);
}

function triple_osc(freq)
{
  return osc(freq) * 0.8 + osc(freq * 2) * 0.4 + osc(freq * 4) * 0.35;
}

function envelope_gen(attack, decay) 
{
  var totalLength = attack + decay;
  
  // currentTime is our cyclical time constant, essentially the x variable in our linear equations
  var currentTime = t % totalLength;
  
  var y = 0.0;
  if (currentTime <= attack) {
    // We're in the attack phase
    var slope = 1.0 / attack;
    
    y = slope * currentTime;
  } else {
    // We're in the decay phase
    var slope = -1.0 / decay;
    var y_intercept = attack / decay + 1.0;
    y = slope * currentTime + y_intercept;
  }
  
  return y;
}
