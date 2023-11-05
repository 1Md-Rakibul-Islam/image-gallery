import React, { useState } from "react";
import Image from "./Image";

const Gallery = ({ images }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  const [mouseHoveredImg, setMouseHoveredImg] = useState();

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

  const handleToggleSelect = (index) => {
    const isSelected = selectedImages.includes(index);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
      setMouseHoveredImg("");
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleHover = (index) => {
    setMouseHoveredImg(index);
  };

  const handleDeleteSelected = () => {
    const updatedImages = galleryImages.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setGalleryImages(updatedImages);
    setSelectedImages([]);
    setMouseHoveredImg("");
  };

  return (
    <div className="max-w-4xl bg-white shadow-2xl lg:rounded-lg md:rounded-md rounded-sm">
      <div className="flex justify-between items-center lg:px-8 md:px-7 sm:px-6 px-5 lg:py-6 md:py-7 py-5 border-b-2 border-gray-300 font-bold">
        {selectedImages?.length > 0 ? (
          <>
            <div className="flex items-center gap-3">
              <input
                onChange={() => setSelectedImages([])}
                className="px-2 py-1 !z-50 h-5 w-5"
                type="checkbox"
                name="select-all"
                id=""
                checked
              />
              <h6 className="text-black text-xl">
                {selectedImages?.length} File Selected
              </h6>
            </div>
            <button
              onClick={handleDeleteSelected}
              className="text-red-600 text-base "
            >
              Delete file
            </button>
          </>
        ) : (
          <h6 className="text-black text-xl font-bold">Gallery</h6>
        )}
      </div>

      <div className="grid grid-rows-3 grid-cols-5 gap-4 lg:p-8 md:p-7 sm:p-6 p-5">
        {galleryImages?.map((image, index) => (
          <div
            key={index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={() => handleDrop(index)}
            onMouseOver={() => handleHover(index)}
            draggable
            className={`${
              index === 0 ? "row-span-2 col-span-2" : "col-span-1"
            } ${
              selectedImages?.includes(index) && "opacity-50"
            } hover:brightness-50 cursor-grab ease-in-out duration-500 rounded-lg border-2 border-gray-300 relative`}
          >
            <Image src={image} />
            {(selectedImages?.includes(index) || mouseHoveredImg === index) && (
              <input
                onChange={() => handleToggleSelect(index)}
                className={`absolute top-3 left-3 px-2 py-1 !z-50 h-5 w-5`}
                type="checkbox"
                name="select"
                checked={selectedImages?.includes(index) ? true : false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
