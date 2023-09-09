"use client";
import { calculateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const CountdownUi = ({ eventtime }) => {
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

  const { days, hours, minutes, seconds } = remainingTime ?? "2023-09-06";
  console.log(days);

  return (
    <div className='grid grid-flow-col gap-1 text-center auto-cols-max mx-auto z-50'>
      <div className='flex flex-col p-2 '>
        <p>{days}</p>
        <p>days</p>
      </div>
      <div className='flex flex-col p-2'>
        <p>{hours}</p>
        <p>hours</p>
      </div>
      <div className='flex flex-col p-2'>
        <p>{minutes}</p>
        <p>minutes</p>
      </div>
      <div className='flex flex-col p-2'>
        <p>{seconds}</p>
        <p>seconds</p>
      </div>
    </div>
  );
};

export default CountdownUi;
