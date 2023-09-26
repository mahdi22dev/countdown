import Movies from "@/components/all/Movies";
import { authOptions } from "@/lib/auth";
import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
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
      <Movies data={data} showSeeMorebtn={showSeeMorebtn} session={session} />
    </main>
  );
}
