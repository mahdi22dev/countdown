"use client";
import { useState } from "react";
import { MyDrawer } from "./Mydrawer";
import { filters } from "@/config/filters";

const Tabs = ({ count, filterFetch }) => {
  const [active, setAactive] = useState(1);
  const handlefilterchange = async (filteroption, id) => {
    setAactive(id);
    await filterFetch(filteroption);
  };

  return (
    <div className='tabs tabs-boxed flex-col md:flex-row gap-5 md:gap-0 items-center justify-between p-4'>
      <div>
        <p className='text-primary text-xs sm:text-sm md:text-base'>
          You have {count} favorite countdown
        </p>
      </div>

      <div>
        {filters.map((filter) => {
          return (
            <button
              key={filter.id}
              onClick={() => {
                handlefilterchange(filter.filter, filter.id);
              }}
              className={`tab text-xs sm:text-sm md:text-base capitalize  ${
                filter.id == active && "tab-active"
              }`}
            >
              {filter.title}
            </button>
          );
        })}
      </div>
      <div>
        <MyDrawer />
      </div>
    </div>
  );
};

export default Tabs;
