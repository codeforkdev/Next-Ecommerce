"use server";

import { db } from "@/db";
import { product } from "@/db/schema";
import { inArray } from "drizzle-orm";

export const deleteProducts = async (ids: string[]) => {
  await db.delete(product).where(inArray(product.id, ids));
};
