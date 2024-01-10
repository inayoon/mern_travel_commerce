import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/thunkFunctions";

export default function CartPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let cartItemIds = [];
    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });
      const body = {
        cartItemIds,
        userCart: userData.cart,
      };
      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    setTotal(total);
  };
  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">My Cart</h2>
      </div>
      {cartDetail?.length > 0 ? (
        <>
          <div className="mt-10">
            <p>
              <span className="font-bold">Total: </span>${total}
            </p>
            <button className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">
              Pay Now
            </button>
          </div>
        </>
      ) : (
        <p>cart is empty!</p>
      )}
    </section>
  );
}
