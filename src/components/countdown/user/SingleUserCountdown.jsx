import React from "react";
import CountdownUi from "../general/CountdownUi";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
const SingleUserCountdown = ({ countdown }) => {
  return (
    <Link href={`/user/countdowns/${countdown.id}`}>
      <div className='flex flex-col justify-between w-72 h-72 max-w-[288px] border border-primary px-2 py-4 bg-neutral rounded-md relative '>
        <Image src={`/themes/${countdown.imageId}.jpg`} fill alt='image' />
        <div className='flex justify-end w-full z-10'>
          <div>
            <FaTrash className='hover:text-primary delay-75' />
          </div>
        </div>
        <p className='my-2 text-center z-10  capitalize text-xs sm:text-2xl '>
          {countdown.title}
        </p>
        <CountdownUi eventtime={countdown.targetDate} />
      </div>
    </Link>
  );
};

export default SingleUserCountdown;
