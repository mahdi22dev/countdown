import ProfileCountdowns from "@/components/countdown/user/ProfileCountdowns";
import {
  getAllUserCountdowns,
  getCountOfUserCountdowns,
} from "@/server-actions/getuser-countdowns";
export default async function page() {
  const skip = 0;
  const size = 20;
  const filterOption = "all";

  const count = await getCountOfUserCountdowns();
  const data = await getAllUserCountdowns(skip, size, filterOption);

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
      <ProfileCountdowns
        data={data}
        count={count}
        showCreateBtn={showCreateBtn}
        showSeeMorebtn={showSeeMorebtn}
        title={"favorites countdown"}
      />
    </main>
  );
}
