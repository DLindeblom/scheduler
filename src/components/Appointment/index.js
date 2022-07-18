import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const saveInterview = {
      student: name,
      interviewer
    };
   bookInterview(id, saveInterview)
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student}/>}
      {mode === CREATE && <Form 
                            interviewers={interviewers}  
                            onCancel={() => back(EMPTY)}
                            onSave={save}
                          />}

    </article>
  );
}