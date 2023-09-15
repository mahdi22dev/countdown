"use client";

import { useEffect, useState } from "react";
import { getAllUserCountdowns } from "@/server-actions/getuser-countdowns";
const ProfileCountdowns = ({ data }) => {
  const [isPending, setIspending] = useState(false);
  const [countdowns, setCountdowns] = useState(data);

  const grabAllcountdowns = async () => {
    setIspending(true);
    const skip = 0;
    const size = 20;
    const data = await getAllUserCountdowns(skip, size);
    setCountdowns(data);
    setIspending(false);
    return data;
  };

  useEffect(() => {
    grabAllcountdowns();
  }, []);
  return countdowns.map((countdown) => {
    return <div>{countdown.title}</div>;
  });
};

export default ProfileCountdowns;
