import React from "react";

const SingleUserCountdown = () => {
  const countdownObject = { title: "countdown 1", countdown: "", image: "" };
  return (
    <div className='w-72 min-w-[288px] mx-2 h-full border border-s-red-900 p-2'>
      <div>edit icons</div>
      <p>{countdownObject.title}</p>
      <div>countdown</div>
    </div>
  );
};

export default SingleUserCountdown;
