import Divider from "@/components/Divider";
import CountdownUi from "@/components/countdown/general/CountdownUi";
import CountdownUiPage from "@/components/countdown/general/CountdownUiPage";
import { authOptions } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

import { getCountdown } from "@/server-actions/get-countdown";
import moment from "moment/moment";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { date } from "yup";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    router.push(`/user/login`);
  }
  const userId = session.user.id;
  const countdownId = params.id;

  const user = await getCountdown(userId, countdownId);
  if (user.countdowns.length == 0) {
    return notFound();
  }
  const { title, targetDate, imageId } = user.countdowns[0];
  const date = formatDate(targetDate);
  return (
    <main className='w-full min-h-screen relative'>
      <div className='center-item z-30 w-full '>
        <p className='text-3xl md:text-5xl font-extrabold uppercase text-primary'>
          {title}
        </p>

        <Divider date={date} />
        <CountdownUiPage eventtime={targetDate} />
      </div>

      <Image
        fill
        className='-z-10 	grayscale-[70%]'
        src={`/themes/${imageId}.jpg`}
      />
    </main>
  );
}
