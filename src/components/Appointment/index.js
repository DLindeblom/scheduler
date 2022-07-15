import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  // console.log(props)
  const { time, interview, interviewers } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student}/>}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)}/>}

    </article>
  );
}