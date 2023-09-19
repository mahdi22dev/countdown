"use client";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { notifyError } from "@/lib/Toast";
import { addtoFavorites } from "@/server-actions/addto-favorites";

const AddFavourite = ({ countdown }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (countdown.Favourite.length) {
      setFavorite(true);
    }
  }, []);

  const addToFavourutes = async () => {
    try {
      setFavorite(!isFavorite);
      const res = await addtoFavorites(countdown.id);
      return res;
    } catch (error) {
      setFavorite(false);
      setIsError(true);
    }
  };
  if (isError) {
    notifyError("an error occurred when adding your favorite");
  }
  return (
    <div
      className='tooltip'
      data-tip={`${
        isFavorite ? "remove from to Favorites" : "add to Favorites"
      }`}
    >
      <FaHeart
        className={`${
          isFavorite && "text-primary"
        } mx-1 text-xl hover:text-primary duration-75`}
        onClick={() => {
          addToFavourutes();
        }}
      />
    </div>
  );
};

export default AddFavourite;
