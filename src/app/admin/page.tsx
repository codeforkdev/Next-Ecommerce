import { db } from "@/db";
import NewProductForm from "./NewProductForm";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import { columns } from "./ProductsTable/columns";
import { faker } from "@faker-js/faker";

export default async function Page() {
  let products = await db.query.product.findMany();
  let products2 = products.map((p) => ({ ...p, image: faker.image.avatar() }));
  return <ProductsTable columns={columns} data={products2} />;
}
