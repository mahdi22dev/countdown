import React from "react";
import Link from "next/link";
import Button from "./ui/Button";
const NavAuthLinks = ({ className }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {/* <Link href={"/register"}>
        <Button variant='primary_outline' text={"sing up"}></Button>
      </Link> */}
      <Link href={"/login"}>
        <Button variant='primary' text={"Sign In"}></Button>
      </Link>
    </div>
  );
};

export default NavAuthLinks;
