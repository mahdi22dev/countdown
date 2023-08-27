"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import UserCountdownButtons from "./UserCountdownButtons";
import SingleUserCountdown from "./SingleUserCountdown";

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
    console.log(status);
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
    return (
      <span className='loading loading-dots text-primary loading-lg'></span>
    );
  }
  if (!authLoading && !islogin) {
    return (
      <div className='w-full h-80 border-orange-400 border p-1 flex justify-center items-center'>
        <Link href={"/login"}>
          <Button variant='primary' text={"Sign In"}></Button>
        </Link>
      </div>
    );
  }
  return (
    <section className='w-full h-80 '>
      {/* button list */}
      <UserCountdownButtons />
      <ul className='max-w-7xl h-full mx-auto scroll-smooth flex justify-start  border-orange-400 border py-2 overflow-x-auto '>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
        <li>
          <SingleUserCountdown />
        </li>
      </ul>
    </section>
  );
};

export default UserCountdown;
