"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Link from "next/link";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const [islogin, setislogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const sessionUser = useSession();
  const [userSession, setUserSession] = useState(sessionUser);
  const { data: session, status } = sessionUser;
  useEffect(() => {
    console.log(status);
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
  return (
    <div className='navbar  bg-base-200 h-[70px] sticky top-0 justify-between'>
      <div>
        <p className='text-3xl'>Logo</p>
      </div>
      {/* drop Down */}
      {islogin ? (
        <div className='dropdown dropdown-end'>
          <label
            tabIndex={0}
            className='btn m-1 relative rounded-full border w-12'
          >
            <Image fill src={"/profile.png"}></Image>
          </label>
          <div tabIndex={0} className='dropdown-content mr-3 w-52'>
            <UserCard />
          </div>
        </div>
      ) : authLoading ? (
        <span className='loading loading-ring loading-lg'></span>
      ) : (
        <div className='flex gap-2'>
          <Link href={"/register"}>
            <Button variant='primary_outline' text={"sing up"}></Button>
          </Link>
          <Link href={"/login"}>
            <Button variant='primary' text={"Sign In"}></Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
