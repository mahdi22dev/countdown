"use client";

export default function Error({ error, reset }) {
  return (
    <div className='flex justify-center items-center flex-col min-h-screen w-full'>
      <h2>Something went wrong!</h2>
      <button className='btn btn-link' onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
