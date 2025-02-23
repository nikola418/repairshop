"use client";

import { Button, Table, TableBody, TableCell, TableRow } from "@/components";
import { SelectCustomerSchema } from "@/validators";
import {
  CellContext,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { startCase } from "lodash";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import CustomersTableHeader from "./CustomersTableHeader";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  MoreHorizontal,
  TableOfContents,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import Link from "next/link";

type Props = {
  data: SelectCustomerSchema[];
};

const CustomersTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "firstName", desc: false },
  ]);

  const columnHeaders: Array<keyof SelectCustomerSchema> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];

  const columnHelper = createColumnHelper<SelectCustomerSchema>();

  const actionCell = ({ row }: CellContext<SelectCustomerSchema, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              New Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/customers/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              Edit Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  actionCell.displayName = "Actions";

  const columns = [
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: actionCell,
    }),
    ...columnHeaders.map((columnHeader) => {
      return columnHelper.accessor(columnHeader, {
        id: columnHeader,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {startCase(columnHeader)}
              {column.getIsSorted() === "asc" && (
                <ArrowUp className="ml-2 size-4" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowDown className="ml-2 size-4" />
              )}
              {column.getIsSorted() !== "asc" &&
                column.getIsSorted() !== "desc" && (
                  <ArrowUpDown className="ml-2 size-4" />
                )}
            </Button>
          );
        },
      });
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting },
    initialState: { pagination: { pageSize: 10 } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="space-x-1">
        <Button variant="secondary" onClick={() => table.resetColumnFilters()}>
          Reset Filters
        </Button>
        <Button variant="secondary" onClick={() => table.resetSorting()}>
          Reset Sorting
        </Button>
        <Button variant="secondary" onClick={() => router.refresh()}>
          Refresh Data
        </Button>
      </div>
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border py-2">
          <CustomersTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
            &nbsp;
            {`[${table.getFilteredRowModel().rows.length}] ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            }`}
          </p>
        </div>
        <div className="space-x-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
