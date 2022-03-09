import React, { useState, useEffect } from 'react';

import './MonoSynthView.css';

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
  const [depthLevel, setDepthLevel] = useState(0);
  const [isGoingUp, setIsGoingUp] = useState(true);

  console.log('depthLevel', depthLevel);

  const feedbackDelay = new Tone.FeedbackDelay(0.525, 0.5).toDestination();
  // const tremolo = new Tone.Tremolo(depthLevel, 1).toDestination().start();

  const synth = new Tone.Synth({
    oscillator: {
      type: 'sawtooth',
    },
    envelope: {
      attack: 0.5,
    },
  }).toDestination();

  useEffect(() => {
    // if (isGoingUp) {
    //   setTimeout(() => {
    //     setDepthLevel((prevState) => prevState + 1);
    //   }, 200);
    //   if (depthLevel === 10) {
    //     setIsGoingUp(false);
    //   }
    // } else {
    //   setTimeout(() => {
    //     setDepthLevel((prevState) => prevState - 1);
    //   }, 200);
    //   if (depthLevel === 1) {
    //     setIsGoingUp(true);
    //   }
    // }
    synth.disconnect(tremolo);
    const tremolo = new Tone.Tremolo(depthLevel, 1).toDestination().start();
    synth.connect(tremolo);
  }, [depthLevel]);

  synth.chain();

  const handleNote = (note) => {
    synth.triggerAttackRelease(note, '1n');
  };

  return (
    <div>
      <section>
        <input
          type="range"
          max="10"
          value={depthLevel}
          onChange={(e) => {
            setDepthLevel(Number(e.target.value));
          }}
        ></input>
      </section>
      {keysArray.map((note) => (
        <button key={note} onClick={() => handleNote(note)}>
          {note}
        </button>
      ))}
    </div>
  );
}
