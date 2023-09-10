import { authOptions } from "@/lib/auth";

import { getCountdown } from "@/server-actions/get-countdown";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

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
  const { id, title, targetDat, imageId, description } = user.countdowns[0];
  return <main></main>;
}
