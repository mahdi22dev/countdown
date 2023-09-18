"use client";
import Image from "next/image";
import React from "react";
import CountdownUi from "../general/CountdownUi";
import Modal from "@/components/Modal";
import Link from "next/link";
import { IoEye } from "react-icons/io5";

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
          <div className='flex justify-end items-center  z-50 relative'>
            <div className='tooltip' data-tip='view countdown'>
              <Link href={`/user/countdowns/${countdown.id}`}>
                <IoEye className='hover:text-primary duration-300 text-2xl mr-1' />
              </Link>
            </div>
            <Modal className={""} id={countdown.id} setReFetch={setReFetch} />
          </div>
        </div>
        <CountdownUi eventtime={countdown.targetDate} ChildclassName={"w-16"} />
      </div>
    </div>
  );
};

export default ProfileSingleCountdown;
