"use client";

import { deleteCountdown } from "@/server-actions/userCountdowns";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

let ModalId = "";
const Modal = ({ className, id, setReFetch }) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const redirectToCountdown = (event) => {
    event.stopPropagation();
  };

  const handledelete = async (e) => {
    try {
      setIsPending(true);
      const res = await deleteCountdown(ModalId);
      setIsPending(false);
      setReFetch(res);
    } catch (error) {
      setIsError(true);
    }
  };
  if (isError) {
    return <div>erro</div>;
  }

  return (
    <>
      <div
        className="tooltip"
        data-tip="delete"
        onClick={(e) => redirectToCountdown(e)}
      >
        <FaTrash
          className={`hover:text-primary duration-300 ${className} z-50 cursor-pointer`}
          onClick={(e) => {
            redirectToCountdown(e);
            ModalId = id;
            document.getElementById("my_modal_5").showModal();
          }}
        />
      </div>

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        onClick={(e) => redirectToCountdown(e)}
      >
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete this countdown</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className=" flex gap-2 justify-center items-center w-full">
                {/* delete button */}
                <div
                  onClick={() => {
                    handledelete();
                  }}
                  className={` ${
                    isPending
                      ? "btn-disabled btn-primary btn-outline"
                      : "btn-primary"
                  } btn flex justify-center items-center mx-auto mb-0 mt-0`}
                >
                  {isPending && (
                    <span className="loading loading-spinner text-primary loading-xs"></span>
                  )}
                  delete
                </div>

                {/* cancel button */}
                <button className="btn btn-primary  btn-outline">cancel</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
