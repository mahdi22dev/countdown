"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoEye } from "react-icons/io5";
import AddFavourite from "../AddFavourite";
import CountdownUi from "../countdown/general/CountdownUi";
import Link from "next/link";

const AllCard = ({ countdown }) => {
  const router = useRouter();

  const redirectToCountdown = () => {
    router.push(`/${countdown.slug}`);
  };
  return (
    <div
      onClick={() => redirectToCountdown()}
      className='card h-56 bg-base-100 shadow-xl image-full relative m-3 hover:shadow-primary hover:shadow-md duration-500 hover:-translate-y-1 cursor-pointer'
    >
      <figure className='relative'>
        <Image
          className=''
          src={countdown.imageUrl}
          alt={countdown.title}
          fill
        />
      </figure>
      <div className='card-body justify-between flex-col'>
        <div className='card-title justify-between'>
          <div className='tooltip w-2/4' data-tip={countdown.title}>
            <h2 className='text-sm md:text-base lg:text-lg truncate max-w-[150px] '>
              {countdown.title}
            </h2>
          </div>
          <div className='flex justify-end items-center w-full z-10 relative'>
            <AddFavourite countdown={countdown} />
            <div className='tooltip' data-tip='view countdown'>
              <Link href={`/${countdown.slug}`}>
                <IoEye className='hover:text-primary duration-300 text-2xl mr-1' />
              </Link>
            </div>
          </div>
        </div>
        <CountdownUi countdown={countdown} ChildclassName={"w-13"} />
      </div>
    </div>
  );
};

export default AllCard;
