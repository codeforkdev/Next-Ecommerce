"use client";

import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export default function CartButton() {
  const cartContext = useContext(CartContext);
  return (
    <button
      onClick={() => {
        console.log("show cart ", cartContext.items);
      }}
    >
      Cart
    </button>
  );
}
