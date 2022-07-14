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