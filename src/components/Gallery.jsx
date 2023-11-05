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

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setGalleryImages([...galleryImages, ...imageArray]);
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
              className="text-red-600 text-base hover:underline"
            >
              Delete file
            </button>
          </>
        ) : (
          <h6 className="text-black text-xl font-bold">Gallery</h6>
        )}
      </div>

      <div className=" grid grid-rows-3 grid-cols-5 gap-4 lg:p-8 md:p-7 sm:p-6 p-5">
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
        <div className="w-full h-full col-span-1 cursor-pointer ease-in-out duration-500 rounded-lg border-2 border-gray-300 relative">
          <label
            htmlFor="file-upload"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <input
              id="file-upload"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-photo-filled"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                stroke-width="0"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-gray-500 text-lg">Upload Image</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
