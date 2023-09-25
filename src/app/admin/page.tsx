import { db } from "@/db";
import NewProductForm from "./NewProductForm";
import { DataTable } from "./products/data-table";
import { columns } from "./products/columns";

export default async function Page() {
  const products = await db.query.product.findMany();
  return (
    <>
      <DataTable columns={columns} data={products} />
    </>
  );
}
