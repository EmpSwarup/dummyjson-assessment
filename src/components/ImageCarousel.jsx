import React, { useState } from "react";

const ImageCarousel = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="h-[460px] rounded-lg overflow-hidden mb-4 relative">
      <img
        src={product.images[currentImageIndex]}
        alt={product.title}
        className="w-full h-full object-cover"
      />
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-amber-200 bg-transparent p-2"
        onClick={previousImage}
      >
        Previous
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-amber-200 bg-transparent p-2"
        onClick={nextImage}
      >
        Next
      </button>
    </div>
  );
};

export default ImageCarousel;
