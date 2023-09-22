"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function AddProductToCart() {
  const [count, setCount] = useState(1);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev <= 1 ? 0 : prev - 1));

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
      <Button className="text-sm">ADD TO CART</Button>
    </div>
  );
}
