import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {

    let spotsLeft = ""
    if (props.spots === 1) {
      spotsLeft = "1 spot remaining"
    }
    if (props.spots === 0) {
      spotsLeft = "no spots remaining"
    }
    return spotsLeft;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {props.spots <= 1 && <h3 className="text--light">{formatSpots()}</h3>}
    </li>
  );
}