import All from "@/components/all/All";
import UserCountdown from "@/components/countdown/user/UserCountdown";
import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
export default async function Home() {
  //fetch movies
  const size = 8;
  const type = "movie";
  const data = await getAllWithType(type, size);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <UserCountdown />
      {/* movies */}
      <All data={data} />
    </main>
  );
}
