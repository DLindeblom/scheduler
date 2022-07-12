import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {

  const oneDay = props.days.map(day => 
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />

    )
  return (
    <ul>
      {oneDay}
    </ul>
  )
}

export default DayList;