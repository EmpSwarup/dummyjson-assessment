import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct } from "@/utils/productapi";
import "./style.css";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (productId) {
      getProduct(productId)
        .then((response) => {
          console.log("Product data:", response);
          setProduct(response);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <div class="loader">
          <span class="loader-text">loading</span>
          <span class="load"></span>
        </div>
      </div>
    );
  }

  return (
    <div class="bg-white py-8 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-black mb-2">{product.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>

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
              </div>
              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span class="text-gray-600 dark:text-gray-300">
                  {product.stock}
                </span>
              </div>
              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Category:
                </span>
                <span class="text-gray-600 dark:text-gray-300">
                  {product.category}
                </span>
              </div>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                Rating: {product.rating}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
