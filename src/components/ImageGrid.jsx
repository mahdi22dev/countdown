"use client";
import Image from "next/image";
import React from "react";

const ImageGrid = ({ images, setSelectedImage, selectedImage }) => {
  const handleImageClick = (id) => {
    console.log(selectedImage);
    setSelectedImage(id);
  };
  return (
    <div className='grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-1 grid bg-primary (remove bg color) rounded-sm -z-50 '>
      {images.map((image) => (
        <div key={image.id} className={`z-40 p-2 relative `}>
          <Image
            src={image.url}
            alt={`Image ${image.url}`}
            width={250}
            height={250}
            style={{ zIndex: -1111 }}
            onClick={() => handleImageClick(image.id)}
            className={`cursor-pointer relative  hover:border-opacity-100 border-4 border-accent rounded-md mx-auto index ${
              image.id == selectedImage
                ? "border-opacity-100 opacity-90"
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
