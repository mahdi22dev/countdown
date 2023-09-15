import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SlMenu, SlClose } from "react-icons/sl";
import NavAuthLinks from "./NavAuthLinks";
import NavLinks from "./NavLinks";
import DropDown from "./DropDown";
export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className='navbar bg-base-200 h-[70px] sticky top-0 justify-between border-b-2 z-50'>
      <div>
        <p className='text-3xl'>Logo</p>
      </div>
      <div className='drawer drawer-end  w-auto flex md:hidden mr-4'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content '>
          <label htmlFor='my-drawer' className='cursor-pointer '>
            <SlMenu className='text-3xl text-primary hover:text-secondary duration-200 hover:scale-125' />
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-[100%] sm:w-[50%] h-full bg-base-200 text-base-content items-end'>
            <label
              htmlFor='my-drawer'
              className='cursor-pointer absolute  right-[80%] top-[3%]'
            >
              <SlClose className='text-3xl text-primary hover:text-secondary duration-200 hover:scale-125' />
            </label>
            {session ? (
              <DropDown
                session={session}
                childClass={"mt-5"}
                className={" md:hidden  "}
              />
            ) : (
              <NavAuthLinks
                className={"flex md:hidden justify-center w-full mb-5"}
              />
            )}

            <NavLinks className={"flex flex-col gap-2 md:hidden  w-[100%]"} />
          </ul>
        </div>
      </div>

      <NavLinks className={"hidden md:flex"} />

      {session ? (
        <DropDown
          session={session}
          childClass={"mt-72"}
          className={"hidden md:flex"}
        />
      ) : (
        <NavAuthLinks className={"hidden md:flex"} />
      )}
    </div>
  );
}
