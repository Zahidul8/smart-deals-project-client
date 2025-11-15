import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id,image, title, price_min, price_max, usage } = product || {};

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <figure className="w-full max-h-[500px] bg-gray-100 flex items-center justify-center overflow-hidden p-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </figure>

      {/* Product Details */}
      <div className="px-4 py-3 text-center w-full">
        <h3 className="text-base font-semibold text-gray-800">
          {title}{" "}
          {usage && (
            <span className="text-gray-500 font-medium">
              - [ {usage} Used ]
            </span>
          )}
        </h3>

        <p className="text-[#8b5cf6] font-semibold mt-1">
          $ {price_min} - {price_max}
        </p>
      </div>

      {/* View Details Button */}
      <div className="px-4 pb-4 mt-auto w-full">
        <Link to={`/productDetails/${_id}`} className="btn w-full cursor-pointer border border-[#8b5cf6] text-[#8b5cf6] rounded-md py-2 font-medium hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
