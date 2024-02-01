import React, { useEffect, useState } from "react";
import { getCategories } from "@/utils/categoryapi";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 12;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const formatCategoryName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container min-h-[90vh] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCategories.map((category, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {formatCategoryName(category)}
              </div>
              <p className="text-gray-700 text-base">
                Explore products from the {category} category.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a
                href={`/categories/${category}`}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                View Products
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(categories.length / categoriesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
