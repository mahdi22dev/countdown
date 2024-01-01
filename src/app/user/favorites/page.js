import Favorites from "@/components/countdown/user/Favorites";
import { authOptions } from "@/lib/auth";
import { grabUserFavorites } from "@/server-actions/userCountdowns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const data = await grabUserFavorites();
  if (!data) {
    return <div>error</div>;
  }

  return (
    <main className=" w-full min-h-[95%]">
      <Favorites data={data} />
    </main>
  );
}
