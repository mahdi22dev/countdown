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
      <div className='flex flex-col p-2 bg-primary rounded-lg  justify-center items-center w-24 h-16 md:w-40 md:h-24'>
        <MotionAnimateTime size={"md:text-2xl text-md"} time={days} />
        <p className='md:text-2xl text-md'>days</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg justify-center items-center  w-24 h-16 md:w-40 md:h-24'>
        <MotionAnimateTime size={"md:text-2xl text-md"} time={hours} />
        <p className='md:text-2xl text-md'>hours</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg justify-center items-center w-24 h-16 md:w-40 md:h-24'>
        <MotionAnimateTime size={"md:text-2xl text-md"} time={minutes} />
        <p className='md:text-2xl text-md'>minutes</p>
      </div>
      <div className='flex flex-col p-2 bg-primary rounded-lg  justify-center items-center w-24 h-16 md:w-40 md:h-24'>
        <MotionAnimateTime size={"md:text-2xl text-md"} time={seconds} />
        <p className='md:text-2xl text-md'>seconds</p>
      </div>
    </div>
  );
};

export default CountdownUiPage;
