import React from "react";
import CountdownUi from "../general/CountdownUi";
import Image from "next/image";
import Link from "next/link";
import EditingButtons from "@/components/EditingButtons";

const SingleUserCountdown = ({ countdown, setReFetch }) => {
  return (
    <>
      <div className='flex flex-col justify-between w-72 h-72 max-w-[288px] border border-primary px-2 py-4 bg-neutral rounded-md relative '>
        <Image src={`/themes/${countdown.imageId}.jpg`} fill alt='image' />
        <div className='flex justify-end items-center z-10 relative'>
          <EditingButtons
            className={""}
            setReFetch={setReFetch}
            countdown={countdown}
          />
        </div>
        <Link className='z-50' href={`/user/countdowns/${countdown.id}`}>
          <p className='my-2 text-center z-10 capitalize text-xs sm:text-xl cursor-pointer hover:text-primary truncate max-w-xs '>
            {countdown.title}
          </p>
        </Link>
        <CountdownUi
          countdown={countdown}
          ChildclassName={"w-16"}
          isAll={false}
        />
      </div>
    </>
  );
};

export default SingleUserCountdown;
