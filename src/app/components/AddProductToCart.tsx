"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export default function AddProductToCart({
  product,
}: {
  product: { id: string; name: string; img: string; price: number };
}) {
  const [count, setCount] = useState(1);
  const { addItem } = useContext(CartContext);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="w-fit flex gap-6">
      <div className="flex border w-fit items-center divide-x rounded">
        <button onClick={decrement} className="p-2">
          <Minus size={16} />
        </button>
        <div className="p-2 px-4">{count}</div>
        <button onClick={increment} className="p-2">
          <Plus size={16} />
        </button>
      </div>
      <Button
        onClick={(e) => {
          console.log("clicked button");
          e.stopPropagation();
          addItem(product, count);
        }}
        className="text-sm"
      >
        ADD TO CART
      </Button>
    </div>
  );
}
