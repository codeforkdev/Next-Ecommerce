"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  DollarSign,
  MoveLeft,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProduct } from "@/components/admin/actions";
import { faker } from "@faker-js/faker";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { nanoid } from "nanoid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const schema = z.object({
  name: z.string().min(1),
  price: z.number(),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset, control, formState, watch } =
    useForm<Schema>({
      resolver: zodResolver(schema),
    });

  const process = handleSubmit((data) => {
    console.log(data.name, data.price);
    insertProduct(data);
  });
  return (
    <div className="h-full flex flex-col ">
      <div className="flex gap-6 mb-10">
        <Button asChild variant="outline" className="px-2">
          <Link href="/admin/products">
            <MoveLeft size={20} />
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <div className="text-xs">Back to product list</div>
          <h1 className="font-bold text-lg">Add New Product</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 overflow-hidden">
        <section className="h-full min-w-[300px] max-w-xl flex-1 flex flex-col gap-4">
          <form
            onSubmit={process}
            className=" max-w-2xl flex-1  p-2 flex flex-col  gap-4 overflow-y-auto w-full"
          >
            {/* Name */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Name</div>
              </CardHeader>
              <CardContent>
                <fieldset>
                  <Input
                    autoFocus
                    onClick={() => console.log("click")}
                    id="name"
                    {...register("name")}
                    type="text"
                  />
                </fieldset>
                {/* <Skeleton className="w-32 h-4" />
              <Skeleton className="w-[80%] h-4" />
              <Skeleton className="w-[90%] h-4" />
              <Skeleton className="w-[60%] h-4" /> */}
              </CardContent>
            </Card>
            {/* Description */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Description</div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            {/* Category */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Category</div>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="Bed and Bath">Bed and Bath</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Food and Grocery">
                        Food and Grocery
                      </SelectItem>
                      <SelectItem value="outdoors">Outdoors</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            {/* Price */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Pricing</div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <fieldset>
                    <Label>Price</Label>
                    <div className="flex items-center relative p-1">
                      <div className="absolute p-1 left-2  rounded">
                        <DollarSign size={12} />
                      </div>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        id="price"
                        {...register("price")}
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="pl-6 "
                      />
                    </div>
                  </fieldset>
                  <fieldset>
                    <Label>Compare-at-price</Label>
                    <div className="flex items-center relative p-1">
                      <div className="absolute p-1 left-2  rounded">
                        <DollarSign size={12} />
                      </div>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="pl-6 "
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="flex">
                  <fieldset>
                    <Label>Cost per item</Label>
                    <div className="flex items-center relative p-1">
                      <div className="absolute p-1 left-2  rounded">
                        <DollarSign size={12} />
                      </div>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="pl-6 "
                      />
                    </div>
                  </fieldset>
                  <fieldset>
                    <Label>Profit</Label>
                    <div className="flex items-center relative p-1">
                      <div className="absolute p-1 left-2  rounded">
                        <DollarSign size={12} />
                      </div>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="pl-6 bg-gray-200"
                      />
                    </div>
                  </fieldset>
                  <fieldset>
                    <Label>Margin</Label>
                    <div className="flex items-center relative p-1">
                      <div className="absolute p-1 left-2  rounded">
                        <DollarSign size={12} />
                      </div>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="pl-6 bg-gray-200"
                      />
                    </div>
                  </fieldset>
                </div>
              </CardContent>
            </Card>
            {/* Images */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Images</div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            {/* Inventory */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Inventory</div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <fieldset className="flex flex-col gap-2">
                    <Label>Quantity</Label>
                    <Input type="number" min={0} defaultValue={0} />
                  </fieldset>
                  <fieldset className="flex flex-col gap-2">
                    <Label>SKU (optional)</Label>
                    <Input type="text" placeholder={nanoid()} />
                  </fieldset>
                </div>
              </CardContent>
            </Card>
            {/* Shipping */}
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 block font-bold">Shipping</div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </form>
          <div className="flex gap-2">
            <Button variant="outline" className="border-red-500 text-red-500">
              Clear
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="ml-auto  text-blue-500">
                    Schedule
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Scheduling coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Add Product
            </Button>
          </div>
        </section>
        <Tabs defaultValue="product-card" className="flex-1">
          <TabsList>
            {/* <TabsTrigger value="product-form">Form</TabsTrigger> */}
            <TabsTrigger value="product-card">Card Preview</TabsTrigger>
            <TabsTrigger value="product-page">Page Preview</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="product-form">
            <form onSubmit={process}>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex gap-6 justify-center">
                    <Step step={1} currentStep={step} />
                    <Step step={2} currentStep={step} />
                    <Step step={3} currentStep={step} />
                    <Step step={4} currentStep={step} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <fieldset>
                      <Label htmlFor="name" className="mb-2 block">
                        Product Name
                      </Label>
                      <Input
                        autoFocus
                        onClick={() => console.log("click")}
                        id="name"
                        {...register("name")}
                        type="text"
                      />
                    </fieldset>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        if (step === 1) return;
                        setStep((prev) => prev - 1);
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="bg-blue-500 rounded-full hover:bg-blue-600"
                      onClick={() => setStep((prev) => prev + 1)}
                    >
                      Continue
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </TabsContent> */}

          <TabsContent value="product-card">
            <div className="group relative min-w-[200px] max-w-[500px]">
              <div className="overflow-clip max-h-[500px] max-w-[500px]">
                <AspectRatio ratio={1} className="max-h-[500px] max-w-[500px] ">
                  <Image
                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    alt=""
                    fill
                  />
                </AspectRatio>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p>
                      {watch("name") === "" ? "Product name" : watch("name")}
                    </p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">blue</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  $ {watch("price")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="product-page">
            <p className="text-2xl">Coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";
  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          complete: {
            scale: 1.25,
          },
          active: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0,
              duration: 0.3,
            },
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className="absolute inset-0 bg-blue-200 rounded-full"
      />
      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#fff",
            color: "#94a3b8",
            borderColor: "#e2e8f0",
          },
          active: {
            backgroundColor: "#fff",
            color: "#3b82f6",
            borderColor: "#3b82f6",
          },
          complete: {
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderColor: "#3b82f6",
          },
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative h-12 w-12 rounded-full border flex items-center justify-center",
          { "border-blue-500": step === currentStep },
          { "bg-blue-500 text-white stroke-white": step < currentStep }
        )}
      >
        {status === "complete" ? (
          <motion.svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: 0.1,
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        ) : (
          step
        )}
      </motion.div>
    </motion.div>
  );
}
