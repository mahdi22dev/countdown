"use client";
import Image from "next/image";
import React, { useState } from "react";
import UserCard from "./UserCard";
import UiButton from "./ui/UiButton";
import OutlineBtn from "./ui/OutlineBtn";
import Link from "next/link";

const Navbar = () => {
  const [islogin, setislogin] = useState(false);
  const email = "idrissimahdi2020@gmail.com";
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
            <OutlineBtn variant={"primary"} text={"sing up"}></OutlineBtn>
          </Link>

          <Link href={"/login"}>
            <button className='btn btn-primary'>Sign In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
