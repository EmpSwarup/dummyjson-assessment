import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct } from "@/utils/productapi";
import "./style.css";
import ImageCarousel from "@/components/ImageCarousel";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (productId) {
      getProduct(productId)
        .then((response) => {
          setProduct(response);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg overflow-hidden mb-4">
              <ImageCarousel product={product} />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="rounded bg-yellow-300 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                Rating: {product.rating}/5
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Category:</span>
              <span className="text-gray-700 ml-2">{product.category}</span>
            </div>
            <div className="mr-8 mb-4">
              <span className="font-bold text-gray-800">Availability:</span>
              <span className="text-gray-700 ml-2">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex flex-wrap items-center mb-4">
              <div className="mr-8 mb-4">
                <span className="font-bold text-gray-800">Price:</span>
                <p className="text-lg">
                  <span className="font-bold text-green-600">
                    $
                    {Math.round(
                      product.price -
                        (product.price * product.discountPercentage) / 100
                    )}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
