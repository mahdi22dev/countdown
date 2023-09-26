"use client";
import { calculateTime, formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MotionAnimateTime from "./MotionAnimateTime";

const CountdownUi = ({
  countdown,
  ChildclassName,
  className,
  animateClass,
  endedClassname,
  isAll,
}) => {
  const [remainingTime, setRemainingTime] = useState(
    calculateTime(countdown.targetDate)
  );
  const [Ended, IsEnded] = useState(false);
  const [isAllNessage, setIsAllNessage] = useState(isAll || false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateTime(countdown.targetDate);
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown.targetDate]);

  let { days, hours, minutes, seconds } = remainingTime ?? "2023-09-06";

  let date1 = new Date();
  if (countdown.targetDate < date1) {
    days = 0;
    hours = 0;
    seconds = 0;
    minutes = 0;
    IsEnded(true);
  }
  if (Ended) {
    return (
      <div className='text-center mx-auto w-full flex items-center justify-center flex-col gap-2'>
        <p className='bg-primary text-3xl w-3/6 rounded-3xl p-3'>Ended</p>
        {isAllNessage ? (
          <p>
            Released at :
            <span className='text-primary'>
              {formatDate(countdown.targetDate)}
            </span>
          </p>
        ) : (
          <p>
            Created at :
            <span className='text-primary'>
              {formatDate(countdown.createdAt)}
            </span>
          </p>
        )}
      </div>
    );
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
