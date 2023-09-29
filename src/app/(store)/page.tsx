import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function Page() {
  return (
    <ul className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <li>
          <ProductCard {...product} img={product.images[0]} />
        </li>
      ))}
    </ul>
  );
}
