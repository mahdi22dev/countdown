import { SlSettings } from "react-icons/sl";
import { IoEye } from "react-icons/io5";
export const links = [
  {
    id: 1,
    name: "Show Profile",
    path: "/profile",
    icon: <IoEye className='text-sm' />,
  },
  {
    id: 2,
    name: "Settings",
    path: "/settings",
    icon: <SlSettings className='text-sm' />,
  },
];
