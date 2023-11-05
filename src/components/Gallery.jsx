import React, { useState } from "react";
import Image from "./Image";

const Gallery = ({ images }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState(images);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    const newImages = [...galleryImages];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setGalleryImages(newImages);
    // Reset draggedIndex after drop
    setDraggedIndex(null);
  };

  return (
    <div className="max-w-4xl bg-white shadow-2xl lg:rounded-lg md:rounded-md rounded-sm">
      <div className="grid grid-rows-3 grid-cols-5 gap-4 lg:p-8 md:p-7 sm:p-6 p-5">
        {galleryImages?.map((image, index) => (
          <div
            key={index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={() => handleDrop(index)}
            draggable
            className={`${
              index === 0 ? "row-span-2 col-span-2" : "col-span-1"
            } hover:brightness-50 cursor-grab ease-in-out duration-500 rounded-lg border-2 border-gray-300`}
          >
            <Image src={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
