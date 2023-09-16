"use client";
import { MyDrawer } from "./Mydrawer";
import { filters } from "@/config/filters";

const Tabs = ({ count, setFilterOption, filterOption }) => {
  const handlefilterchange = (filteroption) => {
    console.log(filteroption);
    setFilterOption({ filter: filteroption });
  };

  return (
    <div className='tabs tabs-boxed flex-col md:flex-row gap-5 md:gap-0 items-center justify-between p-4'>
      <div>
        <p className='text-primary text-xs sm:text-sm md:text-base'>
          You have {count} countdown
        </p>
      </div>

      <div>
        {filters.map((filter) => {
          return (
            <button
              key={filter.id}
              onClick={() => {
                handlefilterchange(filter.filter);
              }}
              className={`tab text-xs sm:text-sm md:text-base capitalize  ${
                filter.filter == filterOption.filter && "tab-active"
              }`}
            >
              {filter.filter}
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
