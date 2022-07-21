import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // call to api using a hook
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // render to the page an updated spot availabilty on booking or deleting an interview
  const updateSpots = (state, appointments) => {

    const currentDay = state.days.find((day) => day.name === state.day);
    const apptID = currentDay.appointments;

    const spots = apptID.filter((id) => !appointments[id].interview).length;
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const updatedDayObj = { ...currentDay, spots };

    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;

    return updatedDaysArr;
  };


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)

      .then((res) => {
        if (res.status === 204) {
          const days = updateSpots(state, appointments);
          setState({ ...state, appointments, days });
        }
      });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)

      .then((res) => {
        if (res.status === 204) {
          const days = updateSpots(state, appointments);
          setState({ ...state, appointments, days });
        }
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
} 