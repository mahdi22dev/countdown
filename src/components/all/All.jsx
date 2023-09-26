"use client";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../ui/Button";
import AllCard from "./AllCard";

const All = ({ data }) => {
  const [countdowns, setCountdown] = useState(data);

  return (
    <section className='w-full p-5 '>
      <div className='max-w-7xl h-20 mb-2 flex justify-between mx-auto items-end gap-2 '>
        <p className='text-primary text-2xl'>Upcoming Movies</p>
        <Link href={"/movies"}>
          <Button
            text={"View All"}
            variant={"primary"}
            className={"text-xs sm:text-sm md:text-base"}
          />
        </Link>
      </div>
      {/* display movies */}
      <div className='w-full flex justify-center items-center max-w-7xl cursor-pointer mx-auto bg-base-100 border border-primary p-1 rounded-md -z-0 '>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 w-full h-full'>
          {countdowns.map((countdown) => {
            return <AllCard key={countdown.id} countdown={countdown} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default All;
