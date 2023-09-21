"use client";
import Image from "next/image";
import CountdownUi from "../general/CountdownUi";
import AddFavourite from "@/components/AddFavourite";
import NavigationLink from "@/components/NavigationLink";

const FavoritesSingleCountdown = ({ countdown }) => {
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
          <h2 className='text-sm md:text-base lg:text-lg truncate max-w-md'>
            {countdown.title}
          </h2>
          <div className='flex justify-end items-center w-full z-10 relative'>
            <AddFavourite countdown={countdown} />
            <NavigationLink id={countdown.id} />
          </div>
        </div>
        <CountdownUi eventtime={countdown.targetDate} ChildclassName={"w-16"} />
      </div>
    </div>
  );
};

export default FavoritesSingleCountdown;
