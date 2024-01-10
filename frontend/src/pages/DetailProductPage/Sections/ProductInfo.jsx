import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions";

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };
  return (
    <div>
      <p className="text-lg text-bold">상품 정보</p>
      <ul>
        <li>
          {" "}
          <span className="font-semibold text-gray-500">Price:</span>${" "}
          {product.price}
        </li>
        <li>
          {" "}
          <span className="font-semibold text-gray-500">Sold:</span>{" "}
          {product.sold}
        </li>
        <li>
          {" "}
          <span className="font-semibold text-gray-500">Description:</span>{" "}
          {product.description}
        </li>
      </ul>
      <div>
        <button
          onClick={handleClick}
          className="w-full px-4 py-2 bg-black text-white hover:bg-gray-700 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
