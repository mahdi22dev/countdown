"use client";

import { MyDrawer } from "@/components/Mydrawer";
import Button from "@/components/ui/Button";
import Link from "next/link";

const UserCountdownButtons = () => {
  return (
    <div className='max-w-7xl h-20 mb-2 flex justify-between mx-auto items-end gap-2 '>
      <p className='text-primary text-2xl'>Your latest countdowns</p>
      <div className='flex gap-2'>
        <MyDrawer />
        <Link href={"/user/profile"}>
          <Button
            text={"View All"}
            variant={"primary"}
            className={"text-xs sm:text-sm md:text-base"}
          />
        </Link>
      </div>
    </div>
  );
};

export default UserCountdownButtons;
