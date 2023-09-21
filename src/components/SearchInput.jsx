"use  client";
import { ImSearch } from "react-icons/im";

const SearchInput = ({ value, handleonChnage }) => {
  return (
    <div className='relative input input-bordered input-primary	md:input-lg w-full min-w-full max-w-xs flex items-center'>
      <input
        type='text'
        placeholder='Search for a countdown'
        className='bg-base-100 h-full ml-3 outline-0 border-0'
        value={value}
        onChange={(e) => {
          handleonChnage(e.target.value);
        }}
      />
      <button
        type='sumbit'
        className='absolute right-2 top-2 mt-3 mr-4 cursor-pointer hover:text-primary hover:scale-125 duration-200'
      >
        <ImSearch className='' />
      </button>
    </div>
  );
};

export default SearchInput;
