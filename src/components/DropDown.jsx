import React from "react";
import UserCard from "./UserCard";
import Image from "next/image";

const DropDown = ({ className, session }) => {
  console.log(session);
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label tabIndex={0} className='btn m-1 relative rounded-full border w-12'>
        <Image fill src={"/profile.png"}></Image>
      </label>
      <div tabIndex={0} className='dropdown-content mr-3 w-52'>
        <UserCard />
      </div>
    </div>
  );
};

export default DropDown;
