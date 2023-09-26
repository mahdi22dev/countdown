import All from "@/components/all/All";
import UserCountdown from "@/components/countdown/user/UserCountdown";
import { getAllWithType } from "@/server-actions/allCountdowns/get-all";
export default async function Home() {
  const size = 8;
  const data = await getAllWithType("movie", size);
  console.log(data);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <UserCountdown />
      <All data={data} />
    </main>
  );
}
