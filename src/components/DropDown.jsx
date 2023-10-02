"use client";
import { useClientSessionContext } from "@/context/client-session";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

const DropDown = ({ className, childClass }) => {
  const { ClientSession } = useClientSessionContext();
  const [avatar, setAvatar] = useState("");

  const fetchAvatar = async () => {
    const userIdentifier = ClientSession?.data?.user?.name ?? "mahdi";
    const seed = userIdentifier;
    const avatar = createAvatar(style, { seed });
    const avatarSvgDataUri = `data:image/svg+xml,${encodeURIComponent(avatar)}`;
    setAvatar(avatarSvgDataUri);
  };

  useEffect(() => {
    fetchAvatar();
  });
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label
        tabIndex={0}
        className='btn m-1 relative rounded-full border w-12 ring ring-primary ring-offset-base-100 ring-offset-2'
      >
        <img
          src={avatar}
          className='font-bold w-12 h-12 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-red-500 z-50'
        />
      </label>
      <div tabIndex={0} className='dropdown-content mr-3  w-52'>
        <UserCard childClass={childClass} />
      </div>
    </div>
  );
};

export default DropDown;
