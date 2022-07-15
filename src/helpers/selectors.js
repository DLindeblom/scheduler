export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.find(dayList => {
    return dayList.name === day;
  });

  if (!filteredDays) {
    return [];
  }

  const appointmentList = filteredDays.appointments.map(appointment => {
    return state.appointments[appointment];
  });


  return appointmentList;

}



export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const newState = { ...state };
  const student = interview.student;
  const interviewer = interview.interviewer;

  const interviewObj = { student, interviewer: newState.interviewers[interviewer] };

  return interviewObj;

}