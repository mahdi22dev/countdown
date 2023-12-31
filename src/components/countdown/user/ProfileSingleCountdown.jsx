"use client";
import Image from "next/image";
import React from "react";
import CountdownUi from "../general/CountdownUi";
import EditingButtons from "@/components/EditingButtons";
import { useRouter } from "next/navigation";

const ProfileSingleCountdown = ({ countdown, setReFetch }) => {
  const router = useRouter();

  const redirectToCountdown = () => {
    router.push(`/user/countdowns/${countdown.id}`);
  };
  return (
    <div
      onClick={() => redirectToCountdown()}
      className='card h-56 bg-base-100 shadow-xl image-full relative m-3 hover:shadow-primary hover:shadow-md duration-500 hover:-translate-y-1 cursor-pointer'
    >
      <figure className='relative'>
        <Image
          className=''
          src={`/themes/${countdown.imageId}.jpg`}
          alt={countdown.title}
          fill
        />
      </figure>
      <div className='card-body justify-between flex-col'>
        <div className='card-title justify-between w-full'>
          <div className='tooltip w-2/4' data-tip={countdown.title}>
            <h2 className='text-sm md:text-base lg:text-lg truncate max-w-[150px] '>
              {countdown.title}
            </h2>
          </div>

          <EditingButtons
            countdown={countdown}
            setReFetch={setReFetch}
            className={"w-2/4"}
          />
        </div>
        <CountdownUi
          countdown={countdown}
          ChildclassName={"w-16"}
          isAll={false}
        />
      </div>
    </div>
  );
};

export default ProfileSingleCountdown;
