import Modal from "@/components/Modal";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
const EditingButtons = ({ setReFetch, id }) => {
  return (
    <div className='flex justify-end items-center w-full z-10 relative'>
      <div className='tooltip' data-tip='view countdown'>
        <Link href={`/user/countdowns/${id}`}>
          <IoEye className='hover:text-primary duration-300 text-2xl mr-1' />
        </Link>
      </div>

      <Modal className={""} id={id} setReFetch={setReFetch} />
    </div>
  );
};

export default EditingButtons;
