import React, { useState } from "react";
import Image from "./Image";

const Gallery = ({ images }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);

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
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = galleryImages.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setGalleryImages(updatedImages);
    setSelectedImages([]);
  };

  const handleSetFeatureImage = () => {
    if (selectedImages.length > 0) {
      const featureImageIndex = selectedImages[0]; // Pretend the first selected image as the feature image
      const updatedImages = galleryImages.map((img, index) => {
        return {
          ...img,
          isFeatureImage: index === featureImageIndex,
        };
      });
      setGalleryImages(updatedImages);
      setSelectedImages([]);
    }
  };

  return (
    <div className="max-w-4xl bg-white shadow-2xl lg:rounded-lg md:rounded-md rounded-sm">
      {selectedImages && (
        <div className="flex justify-between items-center lg:px-8 md:px-7 sm:px-6 px-5 lg:py-6 md:py-7 py-5 border-b-2 border-gray-300 font-bold">
          <div className="flex items-center gap-3">
            <input type="checkbox" name="select-all" id="" />
            <h6 className="text-black text-xl">
              {selectedImages?.length} File Selected
            </h6>
          </div>
          {selectedImages?.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="text-red-600 text-base "
            >
              Delete file
            </button>
          )}
        </div>
      )}

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
            <div
              className={`relative ${
                selectedImages?.includes(index) ? "border border-blue-500" : ""
              }`}
              onClick={() => handleToggleSelect(index)}
            >
              <Image src={image} />
              {selectedImages?.includes(index) && (
                <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full px-2 py-1">
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
