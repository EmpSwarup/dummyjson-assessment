import React, { useEffect, useState } from "react";
import { getProducts } from "@/utils/productapi";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import Head from "next/head";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch((error) => console.error(error));
  }, []);

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>All products</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center my-3">
        <h1 className="text-3xl font-bold my-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-5">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col w-full max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative flex-shrink-0 h-60 overflow-hidden rounded-xl"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {product.discountPercentage} % OFF
                </span>
              </Link>
              <div className="mt-4 px-5 pb-5">
                <Link href={`/products/${product.id}`}>
                  <h5 className="text-xl tracking-tight text-slate-900">
                    {product.title}
                  </h5>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      $
                      {Math.round(
                        product.price -
                          (product.price * product.discountPercentage) / 100
                      )}
                    </span>
                    <span className="text-sm text-slate-900 line-through">
                      ${product.price}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      Rating: {product.rating}/5
                    </span>
                  </div>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
