"use client";

import { Button, Table, TableBody, TableCell, TableRow } from "@/components";
import { TicketSearchResult } from "@/lib";
import {
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
import { isEmpty, startCase } from "lodash";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo, useState } from "react";
import TicketsTableHeader, { Row } from "./TicketsTableHeader";
import { usePolling } from "@/hooks";

type Props = {
  data: TicketSearchResult;
};

const TicketsTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  usePolling({ ms: 10000, searchParam: searchParams.get("search") });

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams]);

  const changePage = (by: number) => {
    const newIndex = table.getState().pagination.pageIndex + by;
    table.setPageIndex(newIndex);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (newIndex + 1).toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: false },
  ]);

  const columnHeaders: Array<keyof Row> = [
    "createdAt",
    "title",
    "tech",
    "firstName",
    "lastName",
    "email",
    "completed",
  ];

  const columnHelper = createColumnHelper<Row>();

  const columns = columnHeaders.map((columnHeader) => {
    return columnHelper.accessor(
      //* transformational
      (row) => {
        const value = row[columnHeader];

        if (columnHeader === "createdAt" && value instanceof Date) {
          return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        } else if (columnHeader === "completed") {
          return value ? "COMPLETED" : "UNCOMPLETED";
        }

        return value;
      },
      {
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
        cell: ({ getValue }) => {
          //* presentational
          const value = getValue();

          if (columnHeader === "completed") {
            return (
              <div className="grid place-content-center">
                {value === "UNCOMPLETED" ? (
                  <CircleXIcon className="opacity-25" />
                ) : (
                  <CircleCheckIcon className="text-green-600" />
                )}
              </div>
            );
          }

          return value;
        },
      }
    );
  });

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting, pagination: { pageSize: 10, pageIndex } },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isEmpty(data)) {
    return <p className="mt-4">No tickets found</p>;
  }

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
        <Table className="border">
          <TicketsTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() =>
                  router.push(`/tickets/form?ticketId=${row.original.id}`)
                }
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
            onClick={() => changePage(-1)}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => changePage(1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketsTable;
