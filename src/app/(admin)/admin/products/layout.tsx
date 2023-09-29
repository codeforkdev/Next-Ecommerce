import { Separator } from "@/components/ui/separator";

export default function Layout(props: {
  children: React.ReactNode;
  productModal: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-50 h-full">
      {/* <h1 className="text-xl">Products</h1>
      <Separator className="my-4" /> */}
      {props.children}
      {props.productModal}
    </div>
  );
}
