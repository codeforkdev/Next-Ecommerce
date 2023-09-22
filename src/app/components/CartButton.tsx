"use client";

import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { ChevronLeft, Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { round2 } from "@/lib/utils";

export default function CartButton() {
  const { items, addItem, removeItem, subtotal, shipping, totalItems } =
    useContext(CartContext);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative"
          onClick={() => {
            console.log("show cart ", items);
          }}
        >
          <ShoppingBag />
          {totalItems > 0 && (
            <p className="absolute border border-white -top-2 -right-4 text-xs h-6 w-6 flex items-center justify-center rounded-full bg-red-600 text-white">
              {totalItems}
            </p>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[600px] flex flex-col p-0">
        <SheetHeader className=" p-4">
          <SheetTitle className="flex items-center gap-4 border-b pb-2">
            <SheetClose>
              <ChevronLeft size={20} />
            </SheetClose>
            Keep shopping
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden ">
          <div className="flex items-center justify-between p-6">
            <p className="font-bold text-lg ">Cart</p>
            <p>{items.reduce((acc, item) => acc + item.count, 0)} items</p>
          </div>
          <div className="h-full overflow-y-auto px-6">
            <ul className="flex flex-1 flex-col gap-4">
              {items.map((item) => (
                <li key={item.id}>
                  <article className="flex h-32 gap-6">
                    <div className="w-32 relative rounded overflow-clip">
                      <Image src={item.img} alt="thing" fill />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold mb-4">{item.name}</p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-4">
                        <button onClick={() => removeItem(item.id, 1)}>
                          <Minus size={16} />
                        </button>
                        {item.count}
                        <button onClick={() => addItem(item, 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                      {/* Price */}

                      <p className="mt-auto">
                        $ {round2(item.price * item.count)}
                      </p>
                    </div>
                    <button
                      className="ml-auto self-start"
                      onClick={() => removeItem(item.id, item.count)}
                    >
                      <X />
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SheetFooter className="px-6 py-2 ">
          <div className="w-full border-t pt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Items Subtotal</p>
              <p className="font-semibold">$ {round2(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping </p>
              <p className="font-semibold">$ {shipping}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated total </p>
              <p className="font-semibold">$ {round2(shipping + subtotal)}</p>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
