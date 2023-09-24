import React from "react";

export default function Loading() {
  return (
    <section className='w-full min-h-screen flex justify-center items-center p-5'>
      <span className='loading loading-dots text-primary loading-lg'></span>
    </section>
  );
}
