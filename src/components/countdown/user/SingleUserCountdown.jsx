import React from "react";
import CountdownUi from "../general/CountdownUi";

const SingleUserCountdown = ({ countdown }) => {
  return (
    <div className='flex flex-col justify-between w-72 min-w-[320px] mx-2 h-full border border-s-red-900 px-2 py-4 '>
      <div className='flex justify-between w-full'>
        <p>tags</p>
        <div>edit icons</div>
      </div>
      <p className='my-2 text-center'> {countdown.title}</p>
      <CountdownUi eventtime={countdown.date} />
    </div>
  );
};

export default SingleUserCountdown;
