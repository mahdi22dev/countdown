"use client";

import { useEffect, useState } from "react";
import { getAllUserCountdowns } from "@/server-actions/getuser-countdowns";
import { MyDrawer } from "./Mydrawer";
import Tabs from "./Tabs";
import ProfileSingleCountdown from "./countdown/user/ProfileSingleCountdown";

let PaginationSkip = 20;
const ProfileCountdowns = ({ data, showSeeMorebtn, showCreateBtn, count }) => {
  const [isPending, setIspending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countdowns, setCountdowns] = useState(data);
  const [showSeeBtn, setShowSeeBtn] = useState(showSeeMorebtn);
  const [showcreate, setShowCreate] = useState(showCreateBtn);
  const [filterOption, setFilterOption] = useState({ filter: "all" });

  const grabAllcountdowns = async () => {
    const skip = 0;
    const size = 20;
    const data = await getAllUserCountdowns(skip, size);
    setCountdowns(data);
    return data;
  };

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
      setShowCreate(true);
    }
    PaginationSkip = 20;
    // grabAllcountdowns();
  }, []);

  // controll show/hide ui elements
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
        filterOption.filter
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

  return (
    <section>
      <Tabs
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        count={count}
      />

      <div className='grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 w-full h-full'>
        {countdowns?.map((countdown) => {
          return (
            <ProfileSingleCountdown countdown={countdown} key={countdown.id} />
          );
        })}
      </div>

      {showSeeBtn && (
        <button
          onClick={() => {
            userPagination();
          }}
          className={` ${
            isPending ? "btn-disabled btn-primary btn-outline" : "btn-primary"
          } btn flex justify-center items-center mx-auto mb-0 mt-0 `}
        >
          {isPending && (
            <span className='loading loading-spinner text-primary loading-xs  '></span>
          )}
          see more
        </button>
      )}
      {showcreate && <MyDrawer />}
    </section>
  );
};

export default ProfileCountdowns;
