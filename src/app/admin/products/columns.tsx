"use client";

import { product } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

type Product = typeof product.$inferSelect;
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Product = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
