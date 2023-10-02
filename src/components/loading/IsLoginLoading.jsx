import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const IsLoginLoading = () => {
  return (
    <section className='w-full h-44 flex flex-col md:flex-row gap-3 justify-center items-center bg-primary/5'>
      <p className='mb-4'>Please sign in to add your countdowns</p>
      <Link href={"/auth/login"}>
        <Button variant='primary' text={"Sign In"} className={"mb-2"}></Button>
      </Link>
    </section>
  );
};

export default IsLoginLoading;
