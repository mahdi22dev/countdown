import React from "react";

const Divider = ({ date, text }) => {
  return (
    <div className='flex justify-center items-center mt-3'>
      <div className='w-[25%] mx-auto mr-1 h-2 bg-primary '></div>
      <p className='text-primary'>
        <span className='text-white font-extrabold'>{text}</span> {date}
      </p>
      <div className='w-[25%] mx-auto ml-1 h-2 bg-primary'></div>
    </div>
  );
};

export default Divider;
