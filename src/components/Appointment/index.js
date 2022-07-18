import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Status from "./Status"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    if (!name || !interviewer) return;
    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
    
  }

  function cancel() {
    transition(DELETING)
    
    const interview = null

    cancelInterview(id, interview)
      .then(() => {
        
        transition(EMPTY)
      })
    
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show 
                          interviewer={interview.interviewer} 
                          student={interview.student}
                          onDelete={cancel}/>}
      {mode === CREATE && <Form 
                            interviewers={interviewers}  
                            onCancel={() => back(EMPTY)}
                            onSave={save}
                          />}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
    </article>
  );
}