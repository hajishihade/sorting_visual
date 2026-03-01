import { useState, useEffect, useRef, useCallback } from 'react';
import { ALGORITHMS, SPEEDS, INITIAL_ARRAY } from '../data/index.js';

export function useSorting() {
  const [algo, setAlgo] = useState("bubble");
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState("normal");

  const intervalRef = useRef(null);

  const algoData = ALGORITHMS[algo];
  const cur = steps[stepIdx] || { arr:INITIAL_ARRAY, line:null, comparing:[], swapping:[], sorted:[], minIdx:null };
  const progress = steps.length > 1 ? (stepIdx / (steps.length - 1)) * 100 : 0;

  // Generate steps when algorithm changes
  useEffect(() => {
    setSteps(ALGORITHMS[algo].generate(INITIAL_ARRAY));
    setStepIdx(0);
    setPlaying(false);
  }, [algo]);

  // Advance to next step
  const advance = useCallback(() => {
    setStepIdx(p => {
      if (p >= steps.length - 1) {
        setPlaying(false);
        return p;
      }
      return p + 1;
    });
  }, [steps.length]);

  // Handle play/pause
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(advance, SPEEDS[speed]);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, speed, advance]);

  // Controls
  const reset = () => {
    setStepIdx(0);
    setPlaying(false);
  };

  const prev = () => {
    setStepIdx(Math.max(0, stepIdx - 1));
  };

  const next = advance;

  const togglePlay = () => {
    setPlaying(p => !p);
  };

  return {
    // State
    algo,
    setAlgo,
    steps,
    stepIdx,
    playing,
    speed,
    setSpeed,
    algoData,
    cur,
    progress,

    // Controls
    reset,
    prev,
    next,
    togglePlay,
    advance,
  };
}
