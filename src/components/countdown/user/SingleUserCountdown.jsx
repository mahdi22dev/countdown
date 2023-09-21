import React from "react";
import CountdownUi from "../general/CountdownUi";
import Image from "next/image";
import Modal from "@/components/Modal";
import Link from "next/link";
import NavigationLink from "@/components/NavigationLink";
import AddFavourite from "@/components/AddFavourite";
import EditingButtons from "@/components/EditingButtons";

const SingleUserCountdown = ({ countdown, setReFetch }) => {
  return (
    <>
      <div className='flex flex-col justify-between w-72 h-72 max-w-[288px] border border-primary px-2 py-4 bg-neutral rounded-md relative '>
        <Image src={`/themes/${countdown.imageId}.jpg`} fill alt='image' />
        <div className='flex justify-end items-center z-10 relative'>
          <AddFavourite countdown={countdown} />
          <NavigationLink id={countdown.id} />
          <Modal className={""} id={countdown.id} setReFetch={setReFetch} />
        </div>
        <Link className='z-50' href={`/user/countdowns/${countdown.id}`}>
          <p className='my-2 text-center z-10 capitalize text-xs sm:text-xl cursor-pointer hover:text-primary truncate max-w-xs '>
            {countdown.title}
          </p>
        </Link>
        <CountdownUi eventtime={countdown.targetDate} ChildclassName={"w-16"} />
      </div>
    </>
  );
};

export default SingleUserCountdown;
