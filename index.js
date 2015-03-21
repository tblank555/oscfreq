
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
  var envelope = osc(0.08);
  
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
