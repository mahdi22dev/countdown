import { MyDrawer } from "@/components/Mydrawer";
import UserCountdown from "@/components/countdown/user/UserCountdown";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <UserCountdown />
    </main>
  );
}
