import Divider from "@/components/Divider";
import CountdownUi from "@/components/countdown/general/CountdownUi";
import { formatDate } from "@/lib/utils";
import { getAllCountdowns } from "@/server-actions/allCountdowns/all";
import { getSllSingleCountdown } from "@/server-actions/allCountdowns/all-singlecountdown";
import Image from "next/image";
import NotFound from "../not-found";

export const dynamicParams = false;

export async function generateStaticParams() {
  const allCountdowns = await getAllCountdowns();
  const result = allCountdowns.map((countdown) => {
    return {
      id: countdown.slug,
    };
  });

  return result;
}

export default async function Page({ params }) {
  const id = params.id;
  const countdown = await getSllSingleCountdown(id);
  if (!countdown) {
    return NotFound();
  }
  const { targetDate, imageUrl, title } = countdown;

  const date = formatDate(targetDate);
  return (
    <main className='w-full min-h-screen relative'>
      <div className='center-item z-30 w-full '>
        <p className='text-3xl md:text-5xl font-extrabold uppercase text-primary px-5 truncate max-w-xs sm:max-w-2xl lg:max-w-5xl   mx-auto'>
          {title}
        </p>

        <Divider date={date} text={"Release in"} />
        <CountdownUi
          countdown={countdown}
          className={"mx-auto mt-3 justify-center items-center"}
          ChildclassName={
            "justify-center items-center w-24 h-16 md:w-40 md:h-24"
          }
          animateClass={"md:text-2xl text-base"}
        />
      </div>

      <Image
        fill
        className='-z-10 grayscale-[70%]'
        src={imageUrl}
        alt={title}
      />
    </main>
  );
}
