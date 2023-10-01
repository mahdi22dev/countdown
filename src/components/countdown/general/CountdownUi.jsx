"use client";
import { calculateTime, formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MotionAnimateTime from "./MotionAnimateTime";

const CountdownUi = ({
  countdown,
  ChildclassName,
  className,
  animateClass,
  isAll,
}) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEnded, setIsEnded] = useState(false);
  const [isAllmessage, setIsAllmessage] = useState(isAll);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateTime(countdown.targetDate);
      setRemainingTime(newRemainingTime);
    }, 1000);

    if (countdown.targetDate < new Date()) {
      setIsEnded(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countdown.targetDate]);

  if (isEnded) {
    return (
      <div className='text-center mx-auto w-full flex items-center justify-center flex-col gap-2 z-50'>
        {isAll ? (
          <>
            <p className='bg-primary text-xl w-4/6 rounded-3xl p-3'>Released</p>
          </>
        ) : (
          <>
            <p className='bg-primary text-xl w-4/6 rounded-3xl p-3'>Ended</p>
            <p className=''>
              Created at :
              <span className='text-primary ml-1'>
                {formatDate(countdown.createdAt)}
              </span>
            </p>
          </>
        )}
      </div>
    );
  }

  let { days, hours, minutes, seconds } = remainingTime;

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
          <p className={`text-xs ${animateClass}`}>minutes</p>
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
