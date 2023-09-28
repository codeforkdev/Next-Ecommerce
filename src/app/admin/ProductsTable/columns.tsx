"use client";
import Image from "next/image";
import { product } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

type Product = typeof product.$inferSelect & { image: string };
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const name = getValue<string>();
      const id = row.getValue<string>("id");
      return (
        <Link
          href={"/admin/product/" + id}
          className="hover:underline hover:text-sky-500"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue, row, column }) => {
      const src = getValue<string>();
      return (
        <div className="relative h-10 w-10">
          <Image src={src} alt="" fill />
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
];
