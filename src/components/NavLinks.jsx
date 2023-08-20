import { navlinks } from "@/config/nav-links";
import Link from "next/link";
import React from "react";

const NavLinks = ({ className }) => {
  return (
    <ul className={`p-3 base-100 ${className}`}>
      {navlinks.map((link) => {
        return (
          <Link
            className='m-0 flex gap-2 py-2 btn-ghost text-[15px] px-2'
            key={link.id}
            href={link.path}
          >
            {link.name}
          </Link>
        );
      })}
    </ul>
  );
};

export default NavLinks;
