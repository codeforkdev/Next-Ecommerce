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
} from "@/components/ui/sheet";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function CartButton() {
  const { items, addProduct } = useContext(CartContext);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          onClick={() => {
            console.log("show cart ", items);
          }}
        >
          Cart
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[600px]">
        <SheetHeader className="mb-10">
          <SheetTitle className="flex items-center gap-4 border-b pb-2">
            <SheetClose>
              <ChevronLeft size={20} />
            </SheetClose>
            Keep shopping
          </SheetTitle>
        </SheetHeader>

        <div>
          <p className="font-bold text-lg mb-6">Cart</p>

          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li>
                <article className="flex h-32">
                  <div className="w-32 relative rounded overflow-clip">
                    <Image src={item.img} alt="thing" fill />
                  </div>
                  <div>
                    <p className="text-sm">{item.name}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
