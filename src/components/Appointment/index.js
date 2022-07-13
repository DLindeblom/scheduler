import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  // console.log(props)
const { time, interview } = props;

// console.log("This is the time:", time)
// console.log("This is the interview prop:", interview)
// console.log("This is the student prop:", interview.student)
// console.log("This is the interviewer prop:", interview.interviewer)


  return (
    <article className="appointment">
      <Header time={time}/>
      {interview && <Show interviewer={interview.interviewer} student={interview.student}/>}
      {!interview && <Empty/>}
      {/* {interview ? <Show student={student} interviewer/> : <Empty/>} */}

    </article>
  );
}