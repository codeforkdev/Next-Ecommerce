import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import ProductCard from "./components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./components/CartButton";

const products = new Array(10).fill(null).map((i) => ({
  id: nanoid(),
  name: faker.commerce.productName(),
  img: faker.image.urlLoremFlickr({ category: "product" }),
}));

export default function Page() {
  return (
    <div>
      <div className="h-16 border-b sticky top-0 z-50 bg-white">
        <nav className=" flex justify-between items-center px-6 h-full max-w-7xl mx-auto">
          <Link href="/">Store</Link>
          <CartButton />
        </nav>
      </div>
      <div className="max-w-md sm:max-w-3xl lg:max-w-5xl px-4 mx-auto border border-blue-500">
        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
