import React, { useState, useEffect } from 'react';

import style from './MonoSynthView.css';

import * as Tone from 'tone';

const keysArray = [
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
];

export default function MonoSynthView() {
  const [depthLevel, setDepthLevel] = useState(0);
  const [isGoingUp, setIsGoingUp] = useState(true);
  const [feedbackOn, setFeedbackON] = useState(0);

  console.log('depthLevel', depthLevel);

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

  useEffect(() => {
    synth.disconnect(feedbackDelay);
    const feedbackDelay = new Tone.FeedbackDelay(0.525, 0.5).toDestination();
    synth.connect(feedbackDelay);
  }, [feedbackOn]);

  const handleNote = (note) => {
    synth.triggerAttackRelease(note, '1n');
  };

  return (
    <div>
      <section>
        <label>
          tremolo depth
          <input
            type="range"
            max="10"
            value={feedbackOn}
            onChange={(e) => {
              setFeedbackON(Number(e.target.value));
            }}
          />
        </label>
        <label>
          FeedbackDelay
          <input
            type="range"
            max="1"
            value={depthLevel}
            onChange={(e) => {
              setDepthLevel(Number(e.target.value));
            }}
          />
        </label>
      </section>

      <div>
        {keysArray.map((note) => {
          if (note.length === 3)
            return (
              <button
                className={style.blackKeys}
                key={note}
                onClick={() => handleNote(note)}
              >
                {note}
              </button>
            );
          else
            return (
              <button
                className={style.whiteKeys}
                key={note}
                onClick={() => handleNote(note)}
              >
                {note}
              </button>
            );
        })}
      </div>
    </div>
  );
}
