import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  // console.log(props)
const { time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview && <Show interviewer={interview.interviewer} student={interview.student}/>}
      {!interview && <Empty/>}
      {/* {interview ? <Show student={student} interviewer/> : <Empty/>} */}

    </article>
  );
}