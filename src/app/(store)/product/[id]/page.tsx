import Image from "next/image";
import { round2 } from "@/lib/utils";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { product, relatedProducts } from "@/data/product";
import { reviews } from "@/data/reviews";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "@/components/providers/CartProvider";
import { useImmer } from "use-immer";

export default function Page({ params }: { params: { id: string } }) {
  if (!product) {
    return <div>Product does not exist</div>;
  }
  return (
    <>
      {/* Image Gallery */}
      <div className="flex gap-20 mb-10">
        <ImageShowcase images={product.images} />
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">{product.name}</h2>
          <p className="font-semibold">$ {round2(product.price)}</p>
          <ul className="flex mb-4">
            {new Array(product.stars).fill(null).map((star, i) => (
              <Star key={i} size={16} className="fill-yellow-500 stroke-none" />
            ))}
          </ul>
          <p className="mb-4">{product.shortDescription}</p>
          <AddProductToCart
            product={{
              id: product.id,
              img: product.images[0],
              name: product.name,
              price: product.price,
            }}
          />
        </div>
      </div>

      <div>
        <Tabs defaultValue="description" className="mb-8">
          <TabsList className="bg-none border-b flex gap-6">
            <TabsTrigger
              value="description"
              className="data-[state=inactive]:border-transparent data-[state=active]:border-yellow-500 border-b-2 shadow-yellow-500"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=inactive]:border-transparent data-[state=active]:border-yellow-500 border-b-2 shadow-yellow-500"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            {product.longDescription}
          </TabsContent>
          <TabsContent value="reviews" className="mb-4">
            <div className="flex divide-x border-b ">
              <div className="p-6 pl-0">
                <p className="text-sm font-semibold">Total Reviews</p>
                <p className="font-bold text-xl">10.0k</p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold">Average Rating</p>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-xl">4.0</p>
                  <ul className="flex ">
                    {new Array(product.stars).fill(null).map((star, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-500 stroke-none"
                      />
                    ))}
                    <Star size={16} className="fill-gray-300 stroke-none" />
                  </ul>
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold">Rating bar graph here</p>
              </div>
            </div>

            <ul className="flex flex-col gap-8 py-8 ">
              {reviews.map((review) => (
                <li className="flex gap-10">
                  <div className="flex gap-4 w-52 shrink-0">
                    <div className="h-14 w-14 relative">
                      <Image src={review.user.avatar} alt="thing" fill />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-sm">
                        {review.user.name}
                      </p>
                      <p className="text-xs">
                        Total Reviews: {review.user.totalReviews}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <ul className="flex  ">
                        {new Array(product.stars).fill(null).map((star, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-500 stroke-none"
                          />
                        ))}
                        <Star size={16} className="fill-gray-300 stroke-none" />
                      </ul>
                      <p className="text-xs">
                        {review.date
                          .toLocaleDateString("en-us", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replaceAll("/", "-")}
                      </p>
                    </div>
                    <p className="text-sm">{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      <section>
        <h3 className="font-semibold text-xl">Related Products</h3>
        <div className="w-24 border-2 my-4" />
        <div className="grid grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard {...product} img={product.images[0]} />
          ))}
        </div>
      </section>
    </>
  );
}

export function AddProductToCart({
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

export function ImageShowcase(props: { images: string[] }) {
  const [showcase, setShowcase] = useState(props.images[0]);
  const [others, setOthers] = useImmer(props.images.slice(1));

  const swap = (index: number, img: string) => {
    setOthers((draft) => {
      draft.splice(index, 1, showcase);
    });
    setShowcase(img);
  };
  return (
    <div>
      <div className="h-96 w-[400px] relative rounded overflow-clip mb-2">
        <Image src={showcase} alt="thing" fill />
      </div>
      <ul className="flex gap-2  w-[400px]">
        {others.map((imgSrc, index) => (
          <div
            key={imgSrc}
            onClick={() => swap(index, imgSrc)}
            className="h-32 flex-1 relative rounded overflow-clip cursor-pointer border-2 border-transparent  hover:border-indigo-500"
          >
            <Image src={imgSrc} alt="thing" fill />
          </div>
        ))}
      </ul>
    </div>
  );
}
