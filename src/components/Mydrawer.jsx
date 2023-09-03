"use client";
import { Drawer } from "vaul";
import Button from "./ui/Button";
import CountDownForm from "./CountDownForm";
const images = [
  { id: 1, url: "/movies.jpg", selected: false },
  { id: 2, url: "/movies.jpg", selected: false },
  { id: 3, url: "/movies.jpg", selected: false },
  { id: 4, url: "/movies.jpg", selected: false },
  { id: 5, url: "/movies.jpg", selected: false },
  { id: 6, url: "/movies.jpg", selected: false },
];

export function MyDrawer() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button
          size={"sm"}
          variant={"primary_outline"}
          text={"Create Countdown"}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/70 ' />
        <Drawer.Content className='flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50'>
          <div className='p-4 rounded-t-[10px] flex-1 bg-secondary'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-primary mb-8 cursor-pointer' />
            <CountDownForm />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
