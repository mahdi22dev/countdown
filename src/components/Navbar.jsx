"use client";
import Image from "next/image";
import React, { useState } from "react";
import UserCard from "./UserCard";
import Link from "next/link";
import Button from "./ui/Button";
const Navbar = () => {
  const [islogin, setislogin] = useState(false);
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
