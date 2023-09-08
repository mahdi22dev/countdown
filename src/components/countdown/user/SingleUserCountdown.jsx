import React from "react";
import CountdownUi from "../general/CountdownUi";
import Image from "next/image";

const SingleUserCountdown = ({ countdown }) => {
  console.log(countdown);
  return (
    <div className='flex flex-col justify-between h-72 border border-primary px-2 py-4 bg-neutral rounded-md relative'>
      <Image src={`/themes/${countdown.imageId}.jpg`} fill alt='image' />
      <div className='flex justify-between w-full z-10'>
        <p>tags</p>
        <div>delete icon</div>
      </div>
      <p className='my-2 text-center z-10  capitalize text-xs sm:text-2xl '>
        {" "}
        {countdown.title}
      </p>
      <CountdownUi eventtime={countdown.targetDate} />
    </div>
  );
};

export default SingleUserCountdown;
