"use client";
import { calculateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MotionAnimateTime from "./MotionAnimateTime";

const CountdownUiPage = ({ eventtime }) => {
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
    <div className='grid grid-flow-col gap-1 text-center auto-cols-max z-50 mx-auto mt-3 justify-center items-center'>
      <div className='flex flex-col p-2 bg-primary rounded-lg w-40 h-24 justify-center items-center'>
        <MotionAnimateTime size={"2xl"} time={days} />
        <p className='text-2xl'>days</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg w-40 h-24 justify-center items-center'>
        <MotionAnimateTime size={"2xl"} time={hours} />
        <p className='text-2xl'>hours</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg w-40 h-24 justify-center items-center'>
        <MotionAnimateTime size={"2xl"} time={minutes} />
        <p className='text-2xl'>minutes</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg w-40 h-24 justify-center items-center'>
        <MotionAnimateTime size={"2xl"} time={seconds} />
        <p className='text-2xl'>seconds</p>
      </div>
    </div>
  );
};

export default CountdownUiPage;
