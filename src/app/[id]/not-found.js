import NotFoundUi from "@/components/NotFoundUi";

export default function NotFound() {
  return (
    <div>
      <NotFoundUi errorMessage={"Could not find requested countdown"} />
    </div>
  );
}
