import Favorites from "@/components/countdown/user/Favorites";
import { grabUserFavorites } from "@/server-actions/getuser-favorites";

export default async function page() {
  const data = await grabUserFavorites();
  if (!data) {
    return <div>error</div>;
  }

  return (
    <main className=' w-full min-h-[95%]'>
      <Favorites data={data} />
    </main>
  );
}
