import Favorites from "@/components/countdown/user/Favorites";
import ProfileCountdowns from "@/components/countdown/user/ProfileCountdowns";
import { getUserFavorites } from "@/server-actions/get-userfavorites";
import {
  getAllUserCountdowns,
  getCountOfUserCountdowns,
} from "@/server-actions/getuser-countdowns";
export default async function page() {
  const skip = 0;
  const size = 20;
  const filterOption = "all";

  const data = await getUserFavorites();
  console.log(data.favorites);
  if (!data) {
    return <div>error</div>;
  }

  let showCreateBtn = false;
  let showSeeMorebtn = true;
  if (data.length == 0) {
    showCreateBtn = true;
    showSeeMorebtn = false;
  } else {
    showSeeMorebtn = true;
    showCreateBtn = false;
  }

  return (
    <main className=' w-full min-h-[95%]'>
      <h1>favorites</h1>
      <Favorites data={data.favorites} count={data.count} />
    </main>
  );
}
