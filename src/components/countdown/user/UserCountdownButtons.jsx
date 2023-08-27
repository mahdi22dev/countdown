import Link from "next/link";

const UserCountdownButtons = () => {
  return (
    <div className='max-w-7xl h-20 mb-2 flex justify-end p-3 pr-0 pb-0 mx-auto items-end gap-2 '>
      <Link className='btn btn-primary btn-outline' href={"/login"}>
        add countdown
      </Link>
    </div>
  );
};

export default UserCountdownButtons;
