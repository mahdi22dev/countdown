import Divider from "@/components/Divider";
import CountdownUi from "@/components/countdown/general/CountdownUi";
import { authOptions } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { getCountdown } from "@/server-actions/get-countdown";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    router.push(`/user/login`);
  }
  const userId = session.user.id;
  const countdownId = params.id;

  const user = await getCountdown(userId, countdownId);
  if (!user.countdowns) {
    return notFound();
  }

  const { title, targetDate, imageId } = user.countdowns[0];
  const date = formatDate(targetDate);
  return (
    <main className='w-full min-h-screen relative'>
      <div className='center-item z-30 w-full '>
        <p className='text-3xl md:text-5xl font-extrabold uppercase text-primary px-5 truncate max-w-xs sm:max-w-2xl lg:max-w-5xl   mx-auto'>
          {title}
        </p>

        <Divider date={date} />
        <CountdownUi
          countdown={user.countdowns[0]}
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
      />
    </main>
  );
}
