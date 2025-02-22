"use client";

import { Button, Table, TableBody, TableCell, TableRow } from "@/components";
import { SelectCustomerSchema } from "@/validators";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { startCase } from "lodash";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import CustomersTableHeader from "./CustomersTableHeader";

type Props = {
  data: SelectCustomerSchema[];
};

const CustomersTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHeaders: Array<keyof SelectCustomerSchema> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];

  const columnHelper = createColumnHelper<SelectCustomerSchema>();

  const columns = columnHeaders.map((columnHeader) => {
    return columnHelper.accessor(columnHeader, {
      id: columnHeader,
      header: startCase(columnHeader),
    });
  });

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    initialState: { pagination: { pageSize: 10 } },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <CustomersTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() =>
                  router.push(`/customers/form?customerId=${row.original.id}`)
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
