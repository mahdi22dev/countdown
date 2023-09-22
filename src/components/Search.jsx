"use client";
import { ImSearch } from "react-icons/im";
import SearchInput from "./SearchInput";
import { useEffect, useState, useRef } from "react";
import { searchCountdownsByTitle } from "@/server-actions/db-search";
import SearchResults from "./SearchResults";

const Search = ({ data }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [countdowns, setCountdown] = useState(data || []);

  const modalRef = useRef(null);

  useEffect(() => {
    const closeModalOnClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        document.getElementById("my_modal_2").hasAttribute("open")
      ) {
        document.getElementById("my_modal_2").close();
      }
    };

    document.addEventListener("mousedown", closeModalOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeModalOnClickOutside);
    };
  }, []);

  const fetchSearch = async () => {
    try {
      setIsPending(true);
      const results = await searchCountdownsByTitle(value);
      setCountdown(results.countdowns);
      return results;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const handleonChnage = (search) => {
    setValue(search);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (value.length > 1) {
      fetchSearch();
    }
  };

  return (
    <div>
      <ImSearch
        className='cursor-pointer hover:text-primary hover:scale-125 duration-200 text-xl'
        onClick={() => document.getElementById("my_modal_2").showModal()}
      />
      <dialog id='my_modal_2' className='modal'>
        <div ref={modalRef} className='modal-box'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <form
            className='w-full flex flex-col justify-center items-center mt-4 gap-3'
            onSubmit={handleSumbit}
          >
            <SearchInput
              value={value}
              setValue={setValue}
              handleonChnage={handleonChnage}
            />

            <SearchResults countdowns={countdowns} isPending={isPending} />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Search;
