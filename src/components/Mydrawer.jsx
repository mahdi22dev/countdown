"use client";
import { Drawer } from "vaul";
import Button from "./ui/Button";
import CountDownForm from "./CountDownForm";

export function MyDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          size={"sm"}
          variant={"primary_outline"}
          text={"Create Countdown"}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-secondary' />
        <Drawer.Content className='flex flex-col rounded-t-[10px] h-[100%] mt-24 fixed bottom-0 left-0 right-0  overflow-auto '>
          <div className='p-4 rounded-t-[10px] flex-1 bg-secondary  '>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-primary mb-2 cursor-pointer'></div>
            <p className='text-xs w-full text-center'> drag down to close</p>
            <p className=' w-full text-center text-lg lg:text-2xl my-1 text-primary-content'>
              {" "}
              Create Your Countdown
            </p>
            <CountDownForm />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
