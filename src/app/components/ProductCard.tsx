"use client";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export default function ProductCard(props: {
  id: string;
  name: string;
  img: string;
}) {
  const cartContext = useContext(CartContext);
  return (
    <article className="border h-60 flex flex-col rounded-lg overflow-clip">
      <div className=" flex-1 relative">
        <Image src={props.img} alt="thing" className="h-full w-full" fill />
      </div>
      <div className="flex justify-between p-1">
        <h3>{props.name}</h3>
        <button
          onClick={() => {
            cartContext.addProduct({ ...props });
          }}
          className="bg-red-600 text-sm text-white py-1 px-4 rounded"
        >
          + Cart
        </button>
      </div>
    </article>
  );
}
