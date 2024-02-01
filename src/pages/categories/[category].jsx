import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsByCategory } from "@/utils/categoryapi";
import ProductCard from "@/components/cards/Productcard";
import Head from "next/head";
import Loader from "@/components/loader/Loader";

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (category) {
      getProductsByCategory(category)
        .then((products) => {
          setProducts(products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [category]);

  const displayCategory = category ? capitalizeFirstLetter(category) : "";

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Buy {displayCategory}</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center my-3">
        <h1 className="text-3xl font-bold my-6">{displayCategory}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
