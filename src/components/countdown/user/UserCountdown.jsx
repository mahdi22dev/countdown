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
import { MyDrawer } from "@/components/Mydrawer";

const UserCountdown = () => {
  const [islogin, setislogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isPending, setIspending] = useState(false);
  const [countdowns, setCountdowns] = useState([]);
  const [refetch, setReFetch] = useState(false);
  const [isError, setIsError] = useState(false);
  const sessionUser = useSession();
  const { data: session, status } = sessionUser;

  const grabAllcountdowns = async () => {
    try {
      setIspending(true);
      const skip = 0;
      const size = 12;
      const data = await getAllUserCountdowns(skip, size, "all");
      setislogin(true);
      setAuthLoading(false);
      setCountdowns(data);
      setIspending(false);
      return data;
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      grabAllcountdowns();
    }
    if (status === "unauthenticated") {
      setislogin(false);
      setAuthLoading(false);
    }
    if (status === "loading") {
      setislogin(false);
      setAuthLoading(true);
    }
  }, [status, refetch]);

  useEffect(() => {
    setAuthLoading(true);
    if (status === "authenticated") {
      grabAllcountdowns();
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

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className='w-full p-5 max-w-[90rem]'>
      <UserCountdownButtons />
      {isPending ? (
        <>
          <div className='w-full flex justify-center items-center  h-[340px] cursor-pointer mx-auto bg-base-100 border border-primary p-1 rounded-md -z-0'>
            <span className='loading loading-spinner loading-md text-primary'></span>
          </div>
        </>
      ) : countdowns.length == 0 ? (
        <>
          <div className='w-full h-[340px] cursor-pointer mx-auto bg-base-100 border border-primary p-1 rounded-md -z-[0] flex justify-center items-center flex-col gap-4'>
            {" "}
            <p>Create New Countdown</p>
            <MyDrawer />
          </div>
        </>
      ) : (
        <Carousel
          responsive={responsive}
          renderButtonGroupOutside={true}
          className='w-full h-[340px] cursor-pointer mx-auto bg-base-100 border border-primary p-1 rounded-md -z-[0]'
          sliderClass='w-full h-full scroll-smooth flex justify-start items-start overflow-hidden p-2 gap-2'
          itemClass=' w-full h-full m-2 flex flex-col justify-between px-2 py-4 '
        >
          {countdowns?.map((countdown) => {
            return (
              <li key={countdown.id}>
                <SingleUserCountdown
                  countdown={countdown}
                  setReFetch={setReFetch}
                />
              </li>
            );
          })}
        </Carousel>
      )}
    </section>
  );
};

export default UserCountdown;
