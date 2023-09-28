"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { product } from "@/db/schema";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Product = typeof product.$inferSelect & { images: string[] };

export default function Modal({ id, name, count, images, price }: Product) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent>
        <div>Product ID: {id}</div>
        <fieldset className="flex flex-col gap-1">
          <Label htmlFor="name">Name</Label>
          <Input type="text" defaultValue={name} />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <Label htmlFor="quantity">Quantity</Label>
          <Input type="number" defaultValue={count} />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Checkbox id="available" />
          <Label htmlFor="available" className="text-sm">
            Available
          </Label>
        </fieldset>
        <div>
          <div className="mb-1">Images:</div>
          <ul className="grid grid-cols-2  gap-2">
            {images.map((image) => (
              <li className=" h-44 relative ">
                <Image src={image} fill alt="" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button disabled={true}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
