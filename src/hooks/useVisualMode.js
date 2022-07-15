import { React, useState } from "react";

// custom hook to move around views
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    //skiping a mode
    if (replace) {
      history.pop();
      setMode(mode);
    }
    //regular mode setting: moving foward one at a time
    setMode(mode);
    history.push(mode);
  };

  function back() {
    //mode cant go past initial
    if (history.length === 1) {
      setMode(initial);
    } else {
    //moving back one at a time
      history.pop();
      let lastValue = history[history.length - 1];
      setMode(lastValue);
    }
  }

  return { mode, transition, back };
}
