import { MyDrawer } from "@/components/Mydrawer";
import FavoritesSingleCountdown from "./FavoritesSingleCountdown";
import Link from "next/link";

export default function Favorites({ data }) {
  return (
    <main>
      <div className='tabs tabs-boxed flex-col md:flex-row gap-5 md:gap-0 items-center justify-between p-4'>
        <div>
          <p className='text-primary text-xs sm:text-sm md:text-base'>
            You have {data?.countdowns?.length ?? "0"} favorites countdown
          </p>
        </div>
        <div>
          <MyDrawer />
        </div>
      </div>

      {data?.countdowns?.length == 0 ? (
        <div className='w-full min-h-[84vh] flex flex-col justify-center items-center gap-3'>
          <h1>
            Create new countdown or
            <span>
              <Link href={"/user/profile"} className='link link-primary'>
                add favorites
              </Link>
            </span>
          </h1>
          <MyDrawer />
        </div>
      ) : (
        <div className='grid rid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 w-full h-full'>
          {data?.countdowns.map((countdown) => {
            return (
              <FavoritesSingleCountdown
                countdown={countdown}
                key={countdown.id}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
