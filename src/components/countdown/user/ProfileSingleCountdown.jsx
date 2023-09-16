import Image from "next/image";
import React from "react";
import CountdownUi from "../general/CountdownUi";

const ProfileSingleCountdown = ({ countdown }) => {
  return (
    <div className='card h-56 bg-base-100 shadow-xl image-full relative m-3 '>
      <figure className='relative '>
        <Image
          className=''
          src={`/themes/${countdown.imageId}.jpg`}
          alt={countdown.title}
          fill
        />
      </figure>
      <div className='card-body justify-between flex-col'>
        <h2 className='card-title'>{countdown.title}</h2>
        <CountdownUi eventtime={countdown.targetDate} ChildclassName={"w-16"} />
      </div>
    </div>
  );
};

export default ProfileSingleCountdown;
