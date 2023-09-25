"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insertProduct } from "../actions/form";

const schema = z.object({
  name: z.string().min(1),
  price: z.number(),
});

type Schema = z.infer<typeof schema>;

export default function NewProductForm() {
  const { register, handleSubmit, reset, control } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const process = handleSubmit((data) => {
    console.log(data.name, data.price);
    insertProduct(data);
  });

  return (
    <div className="shrink-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>

        <DialogContent className="top-[25%]">
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
            <DialogDescription>
              Add a now product to your inventory.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={process} className="flex flex-col gap-4">
            <fieldset>
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input id="name" {...register("name")} type="text" />
            </fieldset>

            <fieldset>
              <Label htmlFor="price" className="mb-2 block">
                Price
              </Label>
              <Input
                id="price"
                {...register("price", { valueAsNumber: true })}
                type="number"
              />
            </fieldset>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
      <DevTool control={control} />
    </div>
  );
}
