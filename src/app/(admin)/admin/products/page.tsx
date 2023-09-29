import { db } from "@/db";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { columns } from "@/components/admin/ProductsTable/columns";
import { faker } from "@faker-js/faker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProductForm from "@/components/admin/NewProductForm";
import { Button } from "@/components/ui/button";

export default async function Page() {
  let products = await db.query.product.findMany();
  let products2 = products.map((p) => ({ ...p, image: faker.image.avatar() }));
  return (
    <>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="text-sm">
            New Product
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[33%] ">
          <DialogHeader className="text-left">
            <DialogTitle>New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <NewProductForm />
        </DialogContent>
      </Dialog> */}
      <ProductsTable columns={columns} data={products2} />
    </>
  );
}
