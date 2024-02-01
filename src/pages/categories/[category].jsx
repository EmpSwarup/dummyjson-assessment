// pages/categories/[category].jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsByCategory } from "@/utils/categoryapi";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (category) {
      getProductsByCategory(category)
        .then(setProducts)
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [category]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold my-6">
        Products in {category && category.toUpperCase()}
      </h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
