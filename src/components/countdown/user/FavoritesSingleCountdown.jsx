"use client";
import Image from "next/image";
import CountdownUi from "../general/CountdownUi";
import AddFavourite from "@/components/AddFavourite";
import NavigationLink from "@/components/NavigationLink";
import { useRouter } from "next/navigation";

const FavoritesSingleCountdown = ({ countdown }) => {
  const router = useRouter();

  const redirectToCountdown = () => {
    router.push(`/user/countdowns/${countdown.id}`);
  };
  return (
    <div
      onClick={() => redirectToCountdown()}
      className='card h-56 bg-base-100 shadow-xl image-full relative m-3 hover:shadow-primary hover:shadow-md duration-500 hover:-translate-y-1 cursor-pointer'
    >
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
          <div className='tooltip w-2/4' data-tip={countdown.title}>
            <h2 className='text-sm md:text-base lg:text-lg truncate max-w-[150px] '>
              {countdown.title}
            </h2>
          </div>
          <div className='flex justify-end items-center w-full z-10 relative'>
            <AddFavourite countdown={countdown} />
            <NavigationLink id={countdown.id} />
          </div>
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

export default FavoritesSingleCountdown;
