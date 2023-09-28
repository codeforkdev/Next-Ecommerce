"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import NewProductForm from "../NewProductForm";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteProducts } from "@/app/actions/product";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type RowSelectionState = Record<string, boolean>;

export function ProductsTable<TValue, TData>({
  columns,
  data,
}: DataTableProps<TValue, TData>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility: {
        id: false,
      },
      rowSelection,
    },
  });

  useEffect(() => {
    console.log(rowSelection);
    console.log(data);
    const keys = Object.keys(rowSelection);

    if (keys.length > 0) {
      const ids = keys.map((k) => {
        const row = table.getRow(k);
        return row.getValue<string>("id");
      });

      setSelectedIds(() => ids);
    }
  }, [rowSelection]);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);
  return (
    <>
      <div className="flex  py-2 gap-2">
        <div className="flex-1 ">
          <Label htmlFor="filter" className="mb-1 block">
            Filter
          </Label>
          <Input
            placeholder="Search products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className=""
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="self-end" onClick={() => console.log("click")}>
              <span>Actions</span>
              <ChevronDown size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  New Product
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="top-[33%] ">
                <DialogHeader className="text-left">
                  <DialogTitle>New Product</DialogTitle>
                  <DialogDescription>
                    Add a new product to your inventory.
                  </DialogDescription>
                </DialogHeader>
                <NewProductForm />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger
                asChild
                disabled={Object.keys(rowSelection).length === 0}
              >
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="top-[33%] ">
                <DialogHeader className="text-left">
                  <DialogTitle>Delete Product(s)</DialogTitle>
                </DialogHeader>
                <div>
                  <p className="text-sm">Product Ids</p>
                  <ul className="border-2 rounded p-2 bg-gray-50 text-sky-700">
                    {selectedIds.map((id) => (
                      <li key={id} className="text-xs">
                        <i>{id}</i>
                      </li>
                    ))}
                  </ul>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault;
                    deleteProducts(selectedIds);
                  }}
                >
                  <fieldset className="flex flex-col gap-2 mb-2">
                    <Label>
                      Type <i>delete</i> below to confirm.
                    </Label>
                    <Input type="text" placeholder="confirm here" />
                  </fieldset>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => console.log(selectedIds)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
