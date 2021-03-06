import { useState } from "react";

// custom hook to move around views
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode)

    //skiping a mode
    if (replace) {
      setHistory([...history.slice(0, -1), newMode])
    } else {

    setHistory([...history, newMode])
    }
  };

  function back() {
    
    //mode cant go past initial
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory([...history.slice(0, -1)])
    } 
    
  }

  return { mode, transition, back };
}
