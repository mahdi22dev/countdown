import UserCard from "./UserCard";
import Image from "next/image";
const DropDown = ({ className, childClass, session }) => {
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label
        tabIndex={0}
        className='btn m-1 relative rounded-full border w-12 ring ring-primary ring-offset-base-100 ring-offset-2'
      >
        <Image fill src={"/profile.png"}></Image>
      </label>
      <div tabIndex={0} className='dropdown-content mr-3  w-52'>
        <UserCard session={session} childClass={childClass} />
      </div>
    </div>
  );
};

export default DropDown;
