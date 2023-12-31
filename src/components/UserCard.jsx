"use client";
import { links } from "@/config/links";
import { useClientSessionContext } from "@/context/client-session";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const UserCard = ({ childClass }) => {
  const { ClientSession } = useClientSessionContext();
  return (
    <div
      className={`${childClass} w-full text-sm h-full p-3 bg-base-200 border border-primary border-opacity-10 rounded-xl`}
    >
      {ClientSession ? (
        <>
          <div className='px-2'>
            <p className='text-secondary text-[15px] font-bold'>
              {ClientSession?.data?.user?.name ?? "user"}
            </p>
            <p className='text-[10px] opacity-60'>
              {ClientSession?.data?.user?.email ?? "email@gmail.com"}
            </p>
          </div>
          <div className='divider m-0'></div>
          <ul className='flex flex-col justify-center'>
            {links.map((link) => {
              return (
                <Link
                  className='m-0 flex gap-2 py-2 btn-ghost text-[15px] px-2'
                  key={link.id}
                  href={link.path}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
          </ul>
          <div className='divider m-0'></div>
          {/* LogOut button */}
          <button
            className='flex gap-2 px-2 py-2 w-full btn-ghost text-[15px]'
            onClick={() => {
              signOut();
              setTimeout(() => {
                location.href = "/";
              }, 2000);
            }}
          >
            {<BiLogOutCircle />} Log Out
          </button>
        </>
      ) : (
        <span className='loading loading-ring loading-xs'></span>
      )}
    </div>
  );
};

export default UserCard;
