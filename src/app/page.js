import All from "@/components/all/All";
import UserCountdown from "@/components/countdown/user/UserCountdown";
import { authOptions } from "@/lib/auth";
import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //fetch movies
  const size = 8;
  const type = "movie";
  const skip = 0;
  const data = await getAllWithType(type, size, skip);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <UserCountdown />
      {/* movies */}
      <All data={data} session={session} />
    </main>
  );
}
