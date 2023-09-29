import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/admin/ProductModal";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { product } from "@/db/schema";
import { faker } from "@faker-js/faker";

export default async function Page({ params }: { params: { id: string } }) {
  const p = await db.query.product.findFirst({
    where: eq(product.id, params.id),
  });

  if (!p) throw new Error();
  return (
    <ProductModal
      {...p}
      images={[
        faker.image.avatar(),
        faker.image.avatar(),
        faker.image.avatar(),
        faker.image.avatar(),
      ]}
    />
  );
}
