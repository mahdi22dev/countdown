import React from "react";

export default function Loading() {
  return (
    <div className='w-full max-h-screen flex justify-center items-center'>
      <span className='loading loading-spinner text-primary loading-lg'></span>
    </div>
  );
}
