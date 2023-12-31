import { SlMenu, SlClose } from "react-icons/sl";
import NavAuthLinks from "./NavAuthLinks";
import NavLinks from "./NavLinks";
import DropDown from "./DropDown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const GenerateAvatar = async () => {
    const userIdentifier = session?.user?.name ?? "mahdi";
    const seed = userIdentifier;
    const avatar = createAvatar(style, { seed });
    const avatarSvgDataUri = `data:image/svg+xml,${encodeURIComponent(avatar)}`;
    return avatarSvgDataUri;
  };

  const avatarUrl = await GenerateAvatar();
  return (
    <div className='navbar bg-base-200 h-[90px] sticky top-0 justify-between border-b-2 z-50'>
      <a href='/'>
        <div className='w-[120px] h-[70px] relative '>
          <Image src={"/logo.png"} fill priority />
        </div>
      </a>
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
                childClass={"mt-5"}
                className={"md:hidden"}
                avatarUrl={avatarUrl}
              />
            ) : (
              <NavAuthLinks
                className={"flex md:hidden justify-center w-full mb-5"}
              />
            )}

            <NavLinks className={"flex flex-col gap-2 md:hidden w-[100%]"} />
          </ul>
        </div>
      </div>

      <NavLinks className={"hidden md:flex"} />

      {session ? (
        <DropDown
          childClass={"mt-72"}
          className={"hidden md:flex"}
          avatarUrl={avatarUrl}
        />
      ) : (
        <NavAuthLinks className={"hidden md:flex"} />
      )}
    </div>
  );
}
