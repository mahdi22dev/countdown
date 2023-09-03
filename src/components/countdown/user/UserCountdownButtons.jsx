"use client";
import { MyDrawer } from "@/components/Mydrawer";
import Button from "@/components/ui/Button";

async function addCountdown() {
  const res = await fetch("http://localhost:3000/api/add");
  const data = await res.json();
  return data;
}

const UserCountdownButtons = () => {
  return (
    <div className='max-w-7xl h-20 mb-2 flex justify-end p-3 pr-0 pb-0 mx-auto items-end gap-2 '>
      <MyDrawer />
    </div>
  );
};

export default UserCountdownButtons;
