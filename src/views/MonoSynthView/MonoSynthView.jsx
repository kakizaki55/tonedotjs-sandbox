import React, { useState } from 'react';

import * as Tone from 'tone';

const keysArray = [
  'C3',
  'D3',
  'E3',
  'F3',
  'G3',
  'A3',
  'B3',
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
];

export default function MonoSynthView() {
  const synth = new Tone.Synth({
    oscillator: {
      type: 'sine2',
    },
    envelope: {
      attack: 0.5,
    },
  }).toDestination();

  const handleNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  return (
    <div>
      {keysArray.map((note) => (
        <button key={note} onClick={() => handleNote(note)}>
          {note}
        </button>
      ))}
    </div>
  );
}
