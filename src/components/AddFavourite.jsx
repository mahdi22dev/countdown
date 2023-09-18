"use client";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { addtoFavouritesk } from "../server-actions/addto-favourites";
const AddFavourite = ({ countdown }) => {
  const [isFavourite, setFavourite] = useState(false);

  useEffect(() => {
    if (countdown.Favourite.length) {
      setFavourite(true);
    }
  }, []);

  const addToFavourutes = async () => {
    try {
      setFavourite(!isFavourite);
      console.log("add to favourite");
      const res = await addtoFavouritesk(countdown.id);
      return res;
    } catch (error) {
      setFavourite(false);
    }
  };

  return (
    <div
      className='tooltip'
      data-tip={`${
        isFavourite ? "remove from to favourites" : "add to favourites"
      }`}
    >
      <FaHeart
        className={`${
          isFavourite && "text-primary"
        } mx-1 text-xl hover:text-primary duration-75`}
        onClick={() => {
          addToFavourutes();
        }}
      />
    </div>
  );
};

export default AddFavourite;
