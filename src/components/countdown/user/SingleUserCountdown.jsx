import React from "react";
import CountdownUi from "../general/CountdownUi";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import { IoEye } from "react-icons/io5";

const SingleUserCountdown = ({ countdown, setReFetch }) => {
  const referenceDate = new Date();
  referenceDate.setHours(0, 0, 0, 0);
  return (
    <>
      <div className='flex flex-col justify-between w-72 h-72 max-w-[288px] border border-primary px-2 py-4 bg-neutral rounded-md relative '>
        <Image src={`/themes/${countdown.imageId}.jpg`} fill alt='image' />
        <div className='flex justify-end items-center w-full z-10 relative'>
          <div className='tooltip' data-tip='view countdown'>
            <Link href={`/user/countdowns/${countdown.id}`}>
              <IoEye className='hover:text-primary duration-300 text-2xl mr-1' />
            </Link>
          </div>

          <Modal
            className={""}
            countdownid={countdown.id}
            setReFetch={setReFetch}
          />
        </div>
        <Link className='z-50' href={`/user/countdowns/${countdown.id}`}>
          <p className='my-2 text-center z-10 capitalize text-xs sm:text-2xl cursor-pointer hover:text-primary '>
            {countdown.title}
          </p>
        </Link>
        <CountdownUi eventtime={countdown.targetDate} />
      </div>
    </>
  );
};

export default SingleUserCountdown;
