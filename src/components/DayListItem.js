import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { selected, spots, name, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () => {

    let spotsLeft = ""
    if (spots === 1) {
      spotsLeft = "1 spot remaining"
    }
    if (spots === 0) {
      spotsLeft = "no spots remaining"
    }
    return spotsLeft;
  }

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      {spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
      {spots <= 1 && <h3 className="text--light">{formatSpots()}</h3>}
    </li>
  );
}