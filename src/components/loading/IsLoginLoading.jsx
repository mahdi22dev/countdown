import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const IsLoginLoading = () => {
  return (
    <section className='w-full h-80 flex flex-col justify-center items-center bg-primary/50'>
      <p className='mb-4'>Please sign in to add your countdowns.</p>
      <Link href={"/login"}>
        <Button variant='primary' text={"Sign In"}></Button>
      </Link>
    </section>
  );
};

export default IsLoginLoading;
