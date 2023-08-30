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

  return (
    <div className='grid grid-flow-col gap-5 text-center auto-cols-max mx-auto '>
      <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
        <span className='countdown font-mono text-2xl'>
          <span style={{ "--value": days ?? "1" }}></span>
        </span>
        days
      </div>
      <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
        <span className='countdown font-mono text-2xl'>
          <span style={{ "--value": hours ?? "23" }}></span>
        </span>
        hours
      </div>
      <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
        <span className='countdown font-mono text-2xl'>
          <span style={{ "--value": minutes ?? "59" }}></span>
        </span>
        min
      </div>
      <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
        <span className='countdown font-mono text-2xl'>
          <span style={{ "--value": seconds ?? "59" }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountdownUi;
