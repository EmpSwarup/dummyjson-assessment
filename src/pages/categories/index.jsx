import React, { useEffect, useState } from "react";
import { getCategories } from "@/utils/categoryapi";
import Head from "next/head";
import Loader from "@/components/loader/Loader";
import CategoryCard from "@/components/cards/Categorycard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const categoriesPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>All Categories</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center my-3">
        <h1 className="text-3xl font-bold my-6">All Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-5">
          {currentCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
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
      </main>
    </>
  );
};

export default CategoriesPage;
