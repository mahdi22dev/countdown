import Movies from "@/components/all/Movies";
import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
import React from "react";
export default async function page() {
  const size = 10;
  const type = "movie";
  const data = await getAllWithType(type, size, 0);
  if (!data) {
    return <div>error</div>;
  }

  let showSeeMorebtn = true;
  if (data.length == 0) {
    showSeeMorebtn = false;
  } else {
    showSeeMorebtn = true;
  }

  return (
    <main className=' w-full min-h-[95%]'>
      <Movies data={data} showSeeMorebtn={showSeeMorebtn} />
    </main>
  );
}
