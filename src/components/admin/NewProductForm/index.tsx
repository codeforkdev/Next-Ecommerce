"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProduct } from "@/components/admin/actions";

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
    <form onSubmit={process} className="flex flex-col gap-4 text-black z-50">
      <fieldset>
        <Label htmlFor="name" className="mb-2 block">
          Name
        </Label>
        <Input
          autoFocus
          onClick={() => console.log("click")}
          id="name"
          {...register("name")}
          type="text"
        />
      </fieldset>

      <fieldset>
        <Label htmlFor="price" className="mb-2 block">
          Price
        </Label>
        <Input
          onClick={() => console.log("click")}
          id="price"
          {...register("price", { valueAsNumber: true })}
          type="number"
        />
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
}
