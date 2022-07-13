import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, value, onChange } = props;

  const oneDay = days.map(day => 
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={onChange}
    />

    )
  return (
    <ul>
      {oneDay}
    </ul>
  )
}

export default DayList;