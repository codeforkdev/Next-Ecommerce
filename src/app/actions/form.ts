"use server";

import { product } from "@/db/schema";
import { db } from "@/db";
import { nanoid } from "nanoid";
export async function insertProduct(item: { name: string; price: number }) {
  await db
    .insert(product)
    .values({ id: nanoid(), name: item.name, price: item.price.toString() });
}
