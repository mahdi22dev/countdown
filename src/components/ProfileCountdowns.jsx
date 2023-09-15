"use client";

import { useEffect, useState } from "react";
import { getAllUserCountdowns } from "@/server-actions/getuser-countdowns";
import { MyDrawer } from "./Mydrawer";
let PaginationSkip = 20;

const ProfileCountdowns = ({ data, showSeeMorebtn, showCreateBtn }) => {
  const [isPending, setIspending] = useState(false);
  const [countdowns, setCountdowns] = useState(data);
  const [showSeeBtn, setShowSeeBtn] = useState(showSeeMorebtn);
  const [showcreate, setShowCreate] = useState(showCreateBtn);

  const grabAllcountdowns = async () => {
    const skip = 0;
    const size = 20;
    const data = await getAllUserCountdowns(skip, size);
    setCountdowns(data);
    return data;
  };

  useEffect(() => {
    if (countdowns.length == 0) {
      console.log(countdowns);
      setShowSeeBtn(false);
      setShowCreate(true);
    }
    PaginationSkip = 20;
    grabAllcountdowns();
  }, []);

  useEffect(() => {
    if (countdowns.length == 0) {
      console.log(countdowns);
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
      const data = await getAllUserCountdowns(PaginationSkip, size);

      if (data.length > 0) {
        setCountdowns((prevCountdowns) => [...prevCountdowns, ...data]);
      } else {
        setShowSeeBtn(false);
      }
      return data;
    } catch (error) {
      console.log("error fetching");
    } finally {
      setIspending(false);
    }
  };

  return (
    <section>
      {countdowns.map((countdown) => {
        return <div key={countdown.id}>{countdown.title}</div>;
      })}
      {showSeeBtn && (
        <button
          onClick={() => {
            userPagination();
          }}
          className={` ${
            isPending ? "btn-disabled btn-primary btn-outline" : "btn-primary"
          } btn flex justify-center items-center mx-auto mb-0 mt-0`}
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
