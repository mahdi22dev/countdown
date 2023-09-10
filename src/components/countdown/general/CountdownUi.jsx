"use client";
import { calculateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MotionAnimateTime from "./MotionAnimateTime";

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

  return (
    <div className='grid grid-flow-col gap-1 text-center auto-cols-max mx-auto z-50'>
      <div className='flex flex-col p-2 bg-primary rounded-lg w-16 '>
        <MotionAnimateTime time={days} />
        <p className='text-xs'>days</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg  w-16'>
        <MotionAnimateTime time={hours} />
        <p className='text-xs'>hours</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg  w-16'>
        <MotionAnimateTime time={minutes} />
        <p className='text-xs'>minutes</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg  w-16'>
        <MotionAnimateTime time={seconds} />
        <p className='text-xs'>seconds</p>
      </div>
    </div>
  );
};

export default CountdownUi;
