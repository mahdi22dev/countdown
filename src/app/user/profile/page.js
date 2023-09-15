import ProfileCountdowns from "@/components/ProfileCountdowns";
import Tabs from "@/components/Tabs";
import {
  getAllUserCountdowns,
  getCountOfUserCountdowns,
} from "@/server-actions/getuser-countdowns";
export default async function page() {
  const skip = 0;
  const size = 20;
  const count = await getCountOfUserCountdowns();
  const data = await getAllUserCountdowns(skip, size);
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
    <main>
      <Tabs count={count} />
      <ProfileCountdowns
        data={data}
        showCreateBtn={showCreateBtn}
        showSeeMorebtn={showSeeMorebtn}
      />
    </main>
  );
}
