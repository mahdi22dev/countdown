"use client";
import { calculateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MotionAnimateTime from "./MotionAnimateTime";

const CountdownUi = ({
  eventtime,
  ChildclassName,
  className,
  animateClass,
}) => {
  // asign countdown value to usestate
  const [remainingTime, setRemainingTime] = useState(calculateTime(eventtime));
  // use effect to change and update countdown values
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateTime(eventtime);
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [eventtime]);

  let { days, hours, minutes, seconds } = remainingTime ?? "2023-09-06";
  let date1 = new Date();
  if (eventtime < date1) {
    days = 0;
    hours = 0;
    seconds = 0;
    minutes = 0;
  }
  return (
    <>
      <div
        className={`grid grid-flow-col gap-1 flex-row text-center auto-cols-max mx-auto z-50 ${className}`}
      >
        <div
          className={`flex flex-col p-2 bg-primary rounded-lg ${ChildclassName}`}
        >
          <MotionAnimateTime time={days} size={animateClass} />
          <p className={`text-xs ${animateClass}`}>days</p>
        </div>
        <div
          className={`flex flex-col p-2 bg-primary rounded-lg ${ChildclassName}`}
        >
          <MotionAnimateTime time={hours} size={animateClass} />
          <p className={`text-xs ${animateClass}`}>hours</p>
        </div>
        <div
          className={`flex flex-col p-2 bg-primary rounded-lg ${ChildclassName}`}
        >
          <MotionAnimateTime time={minutes} size={animateClass} />
          <p cclassName={`text-xs ${animateClass}`}>minutes</p>
        </div>
        <div
          className={`flex flex-col p-2 bg-primary rounded-lg ${ChildclassName}`}
        >
          <MotionAnimateTime time={seconds} size={animateClass} />
          <p className={`text-xs ${animateClass}`}>seconds</p>
        </div>
      </div>
    </>
  );
};

export default CountdownUi;
