import { React, useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) { setMode(mode), history.push(mode); };
  function back() {

    if (history.length === 1) {
      setMode(initial);
    } else {
      history.pop();
      let lastValue = history[history.length - 1];
      setMode(lastValue);
    }
  }

  return { mode, transition, back };
}
