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

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);
  
  const updateSpots = (state) => {
    // console.log(state.days)
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const currentDay = state.days[currentDayIndex];
    // console.log(currentDayIndex)
    const spots = currentDay.appointments.filter((id) => !state.appointments[id].interview).length;
    // console.log(spots)
    const updatedDayObj = { ...currentDay, spots };
  
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
  
    // const updatedState = { ...state, days: updatedDaysArr };
    
    return updatedDaysArr;
  };


  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      
      .then(res => res.status === 204 && setState({...state, appointments}))
      .then(() => setState((prev) => ({...prev, days: updateSpots(prev)})))
      
  }

  function cancelInterview(id) {
    // console.log(id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(res => res.status === 204 && setState({...state, appointments}))
      .then(() => setState((prev) => ({...prev, days: updateSpots(prev)})))
      
  }
  //  console.log("This is State.days:", state.days)


  return { state, setDay, bookInterview, cancelInterview };
} 