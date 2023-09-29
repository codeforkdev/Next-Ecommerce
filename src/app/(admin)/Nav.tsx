"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Store,
  LayoutDashboard,
  ListOrdered,
  Fan,
  Users,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [openShop, setOpenShop] = useState(false);

  const activeLink = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="flex flex-col h-full bg-white ">
      <Link
        href="/admin"
        className="flex items-center p-4 gap-4 border-b text-gray-800"
      >
        <Store size={24} className="text-blue-500" />
        <span className="font-semibold">Admin</span>
      </Link>
      <ul className="text-gray-700 text-sm py-2 flex flex-col gap-1">
        <li className="px-2">
          <NavLink href="/admin" active={activeLink("/admin")}>
            <LayoutDashboard
              size={18}
              className={cn({ "stroke-blue-500": activeLink("/admin") })}
            />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="px-2">
          <Collapsible open={openShop} onOpenChange={setOpenShop}>
            <CollapsibleTrigger className="flex items-center  py-2 rounded px-2 gap-4 hover:bg-white w-full">
              <Store size={18} />
              <span>My shop</span>
              <ChevronDown
                className={cn("rotate-0 ml-auto", { "rotate-180": openShop })}
                size={16}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-4">
              <ul className=" border-l-2 pl-2">
                <li>
                  <Link
                    className="p-2 hover:bg-white hover:text-blue-500 rounded block"
                    href="/admin/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="p-2 hover:bg-white hover:text-blue-500 rounded block"
                    href="/admin/orders"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    className="p-2 hover:bg-white hover:text-blue-500 rounded block"
                    href="/admin/users"
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </li>
        {/* <li className="px-2">
          <NavLink href="/admin/orders" active={activeLink("/admin/orders")}>
            <ListOrdered
              size={18}
              className={cn({ "stroke-blue-500": activeLink("/admin/orders") })}
            />
            <span>Orders</span>
          </NavLink>
        </li> */}
        {/* <li className="px-2">
          <NavLink
            href="/admin/products"
            active={activeLink("/admin/products")}
          >
            <Fan
              size={18}
              className={cn({
                "stroke-blue-500": activeLink("/admin/products"),
              })}
            />
            <span>Products</span>
          </NavLink>
        </li>
        <li className="px-2">
          <NavLink href="/admin/users" active={activeLink("/admin/users")}>
            <Users
              size={18}
              className={cn({
                "stroke-blue-500": activeLink("/admin/users"),
              })}
            />
            <span>Users</span>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center  py-2 rounded px-2 gap-4 hover:bg-gray-100",
        { "bg-gray-100 hover:bg-gray-100 font-semibold": active },
        className
      )}
    >
      {children}
    </Link>
  );
}
