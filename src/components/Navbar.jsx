"use client";
import React, { useEffect, useState } from "react";
import { SlMenu } from "react-icons/sl";
import { useSession } from "next-auth/react";
import NavAuthLinks from "./NavAuthLinks";
import NavLinks from "./NavLinks";
import DropDown from "./DropDown";

const Navbar = () => {
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
  return (
    <div className='navbar bg-base-200 h-[70px] sticky top-0 justify-between border-b-2 z-50'>
      <div>
        <p className='text-3xl'>Logo</p>
      </div>

      {/* drawer for mobile copient all content like user drop down and resue it */}
      <div className='drawer drawer-end  w-auto flex md:hidden mr-4'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content '>
          {/* Page content here */}
          <label htmlFor='my-drawer' className='cursor-pointer '>
            <SlMenu className='text-3xl text-primary hover:text-secondary duration-200 hover:scale-125' />
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-[50%] h-full bg-base-200 text-base-content items-end'>
            {/* the same in desktop but with flex reverse from hiden */}
            {islogin ? (
              // chnage to deffernet user component styles
              <DropDown childClass={"mt-5"} className={" md:hidden  "} />
            ) : authLoading ? (
              <span className='loading loading-ring bg-primary loading-lg hidden md:flex '></span>
            ) : (
              <>
                <NavAuthLinks
                  className={"flex md:hidden justify-center w-full mb-5"}
                />
              </>
            )}
            <NavLinks className={"flex flex-col gap-2 md:hidden  w-[100%]"} />
            {/* social */}
          </ul>
        </div>
      </div>

      {/* drop Down */}
      {/* hidden md:flex */}
      <NavLinks className={"hidden md:flex"} />
      {islogin ? (
        <DropDown childClass={"mt-72"} className={"hidden md:flex"} />
      ) : authLoading ? (
        <span className='loading loading-ring bg-primary loading-lg hidden md:flex mt-'></span>
      ) : (
        <>
          <NavAuthLinks className={"hidden md:flex"} />
        </>
      )}
    </div>
  );
};

export default Navbar;
