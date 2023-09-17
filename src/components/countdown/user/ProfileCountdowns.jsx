"use client";

import { useEffect, useRef, useState } from "react";
import { getAllUserCountdowns } from "@/server-actions/getuser-countdowns";
import { MyDrawer } from "../../Mydrawer";
import Tabs from "../../Tabs";
import ProfileSingleCountdown from "./ProfileSingleCountdown";
import FilterLoading from "../../loading/FilterLoading";

let PaginationSkip = 20;
let GlobalfilterOption = "all";
const ProfileCountdowns = ({ data, showSeeMorebtn, showCreateBtn, count }) => {
  const [isPending, setIspending] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [refetch, setReFetch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countdowns, setCountdowns] = useState(data || []);
  const [showSeeBtn, setShowSeeBtn] = useState(showSeeMorebtn);
  const [showcreate, setShowCreate] = useState(showCreateBtn);
  const initialRef = useRef(true);

  const refetchAfterdelete = async () => {
    try {
      setFilterLoading(true);
      const skip = 0;
      const size = 20;
      const data = await getAllUserCountdowns(skip, size, GlobalfilterOption);
      setCountdowns(data);
      setFilterLoading(false);
      console.log(refetch2);
      return data;
    } catch (error) {
      setIsError(true);
    }
  };
  useEffect(() => {
    if (initialRef) {
      initialRef.current = false;
      return;
    }
    refetchAfterdelete();
  }, [refetch]);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
      setShowCreate(true);
    }
    PaginationSkip = 20;
    // grabAllcountdowns();
  }, []);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
      setShowCreate(true);
    } else {
      setShowSeeBtn(true);
      setShowCreate(false);
    }
  }, [countdowns]);

  const userPagination = async () => {
    try {
      setIspending(true);
      PaginationSkip = PaginationSkip + 20;
      const size = 20;
      const data = await getAllUserCountdowns(
        PaginationSkip,
        size,
        GlobalfilterOption
      );

      if (data.length > 0) {
        const allCountdowns = [...countdowns, ...data];
        setCountdowns(allCountdowns);
      } else {
        setShowSeeBtn(false);
      }
      return data;
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIspending(false);
    }
  };

  const filterFetch = async (filteroption) => {
    GlobalfilterOption = filteroption;
    try {
      setFilterLoading(true);
      setCountdowns([]);
      const size = 20;
      const data = await getAllUserCountdowns(0, size, GlobalfilterOption);

      if (data.length > 0) {
        setCountdowns(data);
      } else {
        setShowSeeBtn(false);
      }
      return data;
    } catch (error) {
      setIsError(true);
    } finally {
      setFilterLoading(false);
    }
  };

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className=''>
      <Tabs count={count} filterFetch={filterFetch} />
      {filterLoading ? (
        <FilterLoading />
      ) : (
        <>
          <div className='grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 w-full h-full'>
            {countdowns?.map((countdown) => {
              return (
                <ProfileSingleCountdown
                  setReFetch={setReFetch}
                  countdown={countdown}
                  key={countdown.id}
                />
              );
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
              } btn flex justify-center items-center mx-auto my-2 `}
            >
              {isPending && (
                <span className='loading loading-spinner text-primary loading-xs'></span>
              )}
              see more
            </button>
          )}
          {showcreate && <MyDrawer />}
        </>
      )}
    </section>
  );
};

export default ProfileCountdowns;
