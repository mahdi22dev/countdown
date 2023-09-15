"use client";
import { images } from "@/config/images";
import Image from "next/image";
import React from "react";

const ImageGrid = ({ setSelectedImage, selectedImage }) => {
  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  return (
    <div className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-1 gap-y-2 grid rounded-sm -z-50 bg-primary/20 xl:w-[90%] mr-auto md:w-full'>
      {images.map((image) => (
        <div
          key={image.id}
          className={`z-40 p-2 w-[80%] h-56 sm:w-56 sm:h-28 md:w-60 md:h-40 relative mx-auto  `}
        >
          <Image
            src={image.url}
            alt={`Image `}
            fill
            style={{ zIndex: -1111 }}
            onClick={() => handleImageClick(image.id)}
            className={`cursor-pointer relative  hover:border-opacity-100 border-4 border-accent rounded-md  ${
              image.id == selectedImage
                ? "border-opacity-100 opacity-60"
                : "border-opacity-40"
            }`}
          />
          <div
            className={` ${
              image.id == selectedImage
                ? "form-control absolute bottom-[50%] left-[28.5%] translate-y-1/2 translate-x-1/2 block"
                : "hidden"
            }`}
          >
            <label className='label cursor-pointer'>
              <input
                type='checkbox'
                checked='checked'
                className='checkbox-lg checkbox checkbox-primary rounded-full w-11 h-11'
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
