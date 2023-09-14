"use client";
import { deleteCountdown } from "@/server-actions/delete-countdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Toast from "./ui/Toast";
const Modal = ({ className, countdownid, setReFetch }) => {
  const [message, setMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handledelete = async () => {
    setIsPending(true);
    setMessage(null);
    const res = await deleteCountdown(countdownid);

    if (res.message.success) {
      setIsPending(true);
      setReFetch("");
      setMessage(res.message.success);
      // using id to trigger useeffect
      setReFetch(countdownid);
      const modal = document.getElementById("my_modal_5");
      modal.close();
    }
    if (res.message.login) {
      setMessage(res.message.success);
      setMessage(res.message.login);
      router.push(`/auth/login`);
    }
    if (res.message.tryagain) {
      setMessage(res.message.success);
      setMessage(res.message.tryagain);
      router.push(`/`);
    }
    setIsPending(false);
  };
  return (
    <>
      {message && <Toast message={message} type={"success"} />}
      <FaTrash
        className={`hover:text-primary duration-300 ${className}`}
        onClick={() => document.getElementById("my_modal_5").showModal()}
      />

      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <p className='py-4'>Are you sure you want to delete this countdown</p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <div className=' flex gap-2 justify-center items-center w-full'>
                {/* delete button */}
                <div className='tooltip' data-tip='hello'>
                  <div
                    onClick={() => {
                      handledelete(countdownid);
                    }}
                    className={` ${
                      isPending
                        ? "btn-disabled btn-primary btn-outline"
                        : "btn-primary"
                    } btn flex justify-center items-center mx-auto mb-0 mt-0`}
                  >
                    {isPending && (
                      <span className='loading loading-spinner text-primary loading-xs  '></span>
                    )}
                    delete
                  </div>
                </div>
                {/* cancel button */}
                <button className='btn btn-primary  btn-outline'>cancel</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
