import Modal from "@/components/Modal";
import NavigationLink from "./NavigationLink";
import AddFavourite from "./AddFavourite";
const EditingButtons = ({ setReFetch, countdown, className }) => {
  return (
    <div className={`flex justify-end items-center z-10 relative ${className}`}>
      <AddFavourite countdown={countdown} />
      <NavigationLink id={countdown.id} />
      <Modal className={""} id={countdown.id} setReFetch={setReFetch} />
    </div>
  );
};

export default EditingButtons;
