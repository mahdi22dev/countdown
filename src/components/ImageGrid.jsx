"use client";
import React from "react";

const ImageGrid = ({ images, setSelectedImage }) => {
  const handleImageClick = (id) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, selected: true };
      } else {
        return { ...image, selected: false };
      }
    });

    setSelectedImage(id);
  };
  return (
    <div className='image-grid'>
      {images.map((image) => (
        <div
          key={image.id}
          className={`image-container ${image.selected ? "selected" : ""}`}
        >
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            onClick={() => handleImageClick(image.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
