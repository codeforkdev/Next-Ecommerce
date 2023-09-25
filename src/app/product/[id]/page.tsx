import Image from "next/image";
import ImageGallery from "@/app/components/ImageGallery";
import { round2 } from "@/lib/utils";
import { Star } from "lucide-react";
import AddProductToCart from "@/app/components/AddProductToCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { product, relatedProducts } from "@/data/product";
import { reviews } from "@/data/reviews";
import ProductCard from "@/app/components/ProductCard";

export default function Page({ params }: { params: { id: string } }) {
  if (!product) {
    return <div>Product does not exist</div>;
  }
  return (
    <>
      {/* Image Gallery */}
      <div className="flex gap-20 mb-10">
        <ImageGallery images={product.images} />
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
