import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="relative flex flex-col w-full max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link href={`/products/${product.id}`} passHref>
        <div className="relative flex-shrink-0 h-60 overflow-hidden rounded-xl">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {product.discountPercentage}% OFF
          </span>
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">
          <Link href={`/products/${product.id}`} passHref>
            <div>{product.title}</div>
          </Link>
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-slate-900">
              $
              {Math.round(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )}
            </span>
            <span className="text-sm text-slate-900 line-through pl-1">
              ${product.price}
            </span>
          </div>
          <span className="ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            Rating: {product.rating}/5
          </span>
        </div>
        <Link href={`/products/${product.id}`} passHref>
          <div className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            View
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
