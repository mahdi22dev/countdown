"use client";

import { useEffect, useRef, useState } from "react";
import { MyDrawer } from "../../Mydrawer";
import ProfileSingleCountdown from "./ProfileSingleCountdown";
import FilterLoading from "../../loading/FilterLoading";
import { getUserFavorites } from "@/server-actions/get-userfavorites";

const Favorites = ({ data, showSeeMorebtn, showCreateBtn, count }) => {
  const [isPending, setIspending] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [refetch, setReFetch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countdowns, setCountdowns] = useState(data || []);
  const [showSeeBtn, setShowSeeBtn] = useState(showSeeMorebtn);
  const [showcreate, setShowCreate] = useState(showCreateBtn);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
  }, [refetch]);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowSeeBtn(false);
      setShowCreate(true);
    }
  }, []);

  useEffect(() => {
    if (countdowns.length == 0) {
      setShowCreate(true);
    } else {
      setShowCreate(false);
    }
  }, [countdowns]);

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className='w-full h-full'>
      {/* <Tabs count={count} filterFetch={filterFetch} /> */}
      {isPending ? (
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

          {showcreate && <MyDrawer />}
        </>
      )}
    </section>
  );
};

export default Favorites;
