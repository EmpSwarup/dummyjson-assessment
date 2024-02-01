import React from "react";

const CategoryCard = ({ category }) => {
  const formatCategoryName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {formatCategoryName(category)}
        </div>
        <p className="text-gray-700 text-base">
          Explore products from the {formatCategoryName(category)} category.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={`/categories/${encodeURIComponent(category)}`}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View Products
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
