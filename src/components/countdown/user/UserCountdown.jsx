"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import UserCountdownButtons from "./UserCountdownButtons";
import SingleUserCountdown from "./SingleUserCountdown";
import { animeReleases } from "@/config/testData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AuthLoading from "@/components/loading/AuthLoading";
import IsLoginLoading from "@/components/loading/IsLoginLoading";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const UserCountdown = () => {
  const [islogin, setislogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const sessionUser = useSession();

  const { data: session, status } = sessionUser;

  useEffect(() => {
    if (status === "authenticated") {
      setislogin(true);
      setAuthLoading(false);
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
      setislogin(true);
      setAuthLoading(false);
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

  const currentDate = new Date();

  const FilterAnimetest = animeReleases.filter((anime) => {
    const releasDate = new Date(anime.date);
    return releasDate >= currentDate;
  });

  return (
    <section className='w-full  p-5'>
      <UserCountdownButtons />
      <Carousel
        responsive={responsive}
        className='w-full max-w-7xl h-[340px] cursor-pointer  mx-auto bg-base-100 border border-primary p-1 rounded-md -z-0'
        sliderClass='w-full h-full scroll-smooth flex justify-start items-start overflow-hiddenr  p-2 gap-2'
        itemClass=' w-full h-full m-2 flex flex-col justify-between px-2 py-4'
      >
        {FilterAnimetest?.map((countdown) => {
          return (
            <li key={countdown.id}>
              <SingleUserCountdown countdown={countdown} />
            </li>
          );
        })}
      </Carousel>
    </section>
  );
};

export default UserCountdown;
