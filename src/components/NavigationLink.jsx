import Link from "next/link";
import { IoEye } from "react-icons/io5";

const NavigationLink = ({ id }) => {
  return (
    <div className='tooltip' data-tip='view countdown'>
      <Link href={`/user/countdowns/${id}`}>
        <IoEye className='hover:text-primary duration-300 text-2xl mr-1' />
      </Link>
    </div>
  );
};

export default NavigationLink;
