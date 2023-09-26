"use client";

import { useEffect, useState } from "react";

import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
import AllCard from "./AllCard";
import FilterLoading from "../loading/FilterLoading";
let PaginationSkip = 10;

const Movies = ({ data, showSeeMorebtn }) => {
  const [isPending, setIspending] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countdowns, setCountdowns] = useState(data || []);
  const [showSeeBtn, setShowSeeBtn] = useState(showSeeMorebtn);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
    }
    PaginationSkip = 10;
    // grabAllcountdowns();
  }, []);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
    } else {
      setShowSeeBtn(true);
    }
  }, [countdowns]);

  const userPagination = async () => {
    try {
      setIspending(true);
      PaginationSkip = PaginationSkip + 10;
      const size = 10;
      const type = "movie";
      const data = await getAllWithType(type, size, PaginationSkip);

      if (data.length > 0) {
        const allCountdowns = [...countdowns, ...data];
        setCountdowns(allCountdowns);
      } else {
        setShowSeeBtn(false);
      }
      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setIspending(false);
    }
  };

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className='w-full h-full'>
      {filterLoading ? (
        <FilterLoading />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 w-full h-full'>
            {countdowns?.map((countdown) => {
              return <AllCard countdown={countdown} key={countdown.id} />;
            })}
          </div>

          {showSeeBtn && (
            <button
              onClick={() => {
                userPagination();
              }}
              className={` ${
                isPending
                  ? "btn-disabled btn-primary btn-outline"
                  : "btn-primary"
              } btn flex justify-center items-center mx-auto my-2   `}
            >
              {isPending && (
                <span className='loading loading-spinner text-primary loading-xs'></span>
              )}
              see more
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Movies;
