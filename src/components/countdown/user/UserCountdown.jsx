"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserCountdownButtons from "./UserCountdownButtons";
import SingleUserCountdown from "./SingleUserCountdown";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AuthLoading from "@/components/loading/AuthLoading";
import IsLoginLoading from "@/components/loading/IsLoginLoading";
import { getAllUserCountdowns } from "@/server-actions/getuser-countdowns";
import { responsive } from "@/config/carousel";

const UserCountdown = () => {
  const [islogin, setislogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isPending, setIspending] = useState(false);
  const [countdowns, setCountdowns] = useState([]);
  const sessionUser = useSession();
  const { data: session, status } = sessionUser;

  const grabAllcountdowns = async (id) => {
    setIspending(true);
    const data = await getAllUserCountdowns(id);
    setislogin(true);
    setAuthLoading(false);
    setCountdowns(data);
    setIspending(false);
    return data;
  };

  useEffect(() => {
    if (status === "authenticated") {
      grabAllcountdowns(session.user.id);
    }
    if (status === "unauthenticated") {
      setislogin(false);
      setAuthLoading(false);
    }
    if (status === "loading") {
      setislogin(false);
      setAuthLoading(true);
    }
  }, [status]);

  useEffect(() => {
    setAuthLoading(true);
    if (status === "authenticated") {
      grabAllcountdowns(session.user.id);
    }
    if (status === "unauthenticated") {
      setislogin(false);
      setAuthLoading(false);
    }
    if (status === "loading") {
      setislogin(false);
      setAuthLoading(true);
    }
  }, []);

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!authLoading && !islogin) {
    return <IsLoginLoading />;
  }

  return (
    <section className='w-full  p-5'>
      <UserCountdownButtons />
      {isPending ? (
        <>
          <div className='w-full flex justify-center items-center max-w-7xl h-[340px] cursor-pointer mx-auto bg-base-100 border border-primary p-1 rounded-md -z-0'>
            <span className='loading loading-spinner loading-md text-primary'></span>
          </div>
        </>
      ) : (
        <Carousel
          responsive={responsive}
          className='w-full max-w-7xl h-[340px] cursor-pointer  mx-auto bg-base-100 border border-primary p-1 rounded-md -z-0'
          sliderClass='w-full h-full scroll-smooth flex justify-start items-start overflow-hiddenr  p-2 gap-2'
          itemClass=' w-full h-full m-2 flex flex-col justify-between px-2 py-4'
        >
          {countdowns?.map((countdown) => {
            return (
              <li key={countdown.id}>
                <SingleUserCountdown countdown={countdown} />
              </li>
            );
          })}
        </Carousel>
      )}
    </section>
  );
};

export default UserCountdown;
