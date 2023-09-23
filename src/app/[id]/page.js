import Divider from "@/components/Divider";
import CountdownUi from "@/components/countdown/general/CountdownUi";
import { formatDate } from "@/lib/utils";
import { getAllCountdowns } from "@/server-actions/all";
import { getSllSingleCountdown } from "@/server-actions/all-singlecountdown";
import Image from "next/image";

export const dynamicParams = false;

export async function generateStaticParams() {
  const allCountdowns = await getAllCountdowns();

  const result = allCountdowns.map((countdown) => {
    return {
      id: countdown.id,
    };
  });

  return result;
}

export default async function Page({ params }) {
  const id = params.id;
  const countdown = await getSllSingleCountdown(id);
  const date = formatDate();
  return (
    <main className='w-full min-h-screen relative'>
      <p>{countdown.title}</p>
      {/* <div className='center-item z-30 w-full '>
        <p className='text-3xl md:text-5xl font-extrabold uppercase text-primary px-5 truncate max-w-xs sm:max-w-2xl lg:max-w-5xl   mx-auto'>
          {title}
        </p>

        <Divider date={date} />
        <CountdownUi
          eventtime={targetDate}
          className={"mx-auto mt-3 justify-center items-center"}
          ChildclassName={
            "justify-center items-center w-24 h-16 md:w-40 md:h-24"
          }
          animateClass={"md:text-2xl text-base"}
        />
      </div>

      <Image
        fill
        className='-z-10 	grayscale-[70%]'
        src={`/themes/${imageId}.jpg`}
        alt={title}
      /> */}
    </main>
  );
}
