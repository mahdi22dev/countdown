"use client";
import Image from "next/image";
import React from "react";
import CountdownUi from "../general/CountdownUi";
import EditingButtons from "@/components/EditingButtons";

const ProfileSingleCountdown = ({ countdown, setReFetch }) => {
  return (
    <div className='card h-56 bg-base-100 shadow-xl image-full relative m-3'>
      <figure className='relative '>
        <Image
          className=''
          src={`/themes/${countdown.imageId}.jpg`}
          alt={countdown.title}
          fill
        />
      </figure>
      <div className='card-body justify-between flex-col'>
        <div className='card-title justify-between'>
          <h2 className='text-sm md:text-base lg:text-lg'>{countdown.title}</h2>
          <EditingButtons countdown={countdown} setReFetch={setReFetch} />
        </div>
        <CountdownUi eventtime={countdown.targetDate} ChildclassName={"w-16"} />
      </div>
    </div>
  );
};

export default ProfileSingleCountdown;
