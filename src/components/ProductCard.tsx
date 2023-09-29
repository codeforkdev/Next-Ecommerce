"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard(props: {
  id: string;
  name: string;
  img: string;
  price: number;
}) {
  const { addItem } = useContext(CartContext);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <div
      // href={"/product/" + props.id}
      className="group hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        router.push("/product/" + props.id);
        console.log(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <article className="h-96 flex flex-col">
        <div className=" flex-1 relative rounded overflow-clip">
          <Image src={props.img} alt="thing" className="h-full w-full" fill />
          {hover && (
            <div className="absolute h-fit bottom-0 w-full  bg-black/50 transition-all flex items-end p-4 justify-center">
              <Button
                variant="ghost"
                className="text-white border w-full"
                onClick={(e) => {
                  console.log("clicked button");
                  e.stopPropagation();
                  addItem(props, 1);
                }}
              >
                Add to cart
              </Button>
            </div>
          )}
        </div>

        <div className="py-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">{props.name}</h3>
            <p className="font-semibold">$ {props.price}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-1">
              <Star size={14} className="fill-yellow-500 stroke-gray-400" />
              <Star size={14} className="fill-yellow-500 stroke-gray-400" />
              <Star size={14} className="fill-yellow-500 stroke-gray-400" />
              <Star size={14} className="fill-yellow-500 stroke-gray-400" />
              <Star size={14} className=" stroke-gray-400" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
