import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct } from "@/utils/productapi";
import ImageCarousel from "@/components/ImageCarousel";
import Loader from "@/components/loader/Loader";
import Head from "next/head";
import Link from "next/link";

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="bg-gray-100 pt-8 pb-32">
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
                <Link href={`/categories/${product.category}`}>
                  <span className="text-gray-700 ml-2">
                    {capitalizeFirstLetter(product.category)}
                  </span>
                </Link>
              </div>
              <div className="mr-8 mb-4">
                <span className="font-bold text-gray-800">Availability:</span>
                <span className="text-emerald-500 ml-2">{product.stock}</span>
                <span className="text-gray-700 ml-2">
                  ({product.stock > 0 ? "In Stock" : "Out of Stock"})
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
                    <span className="font-bold text-gray-500 line-through ml-2">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.discountPercentage} % OFF!!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailPage;
