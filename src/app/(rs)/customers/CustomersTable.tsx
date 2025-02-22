"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { SelectCustomerSchema } from "@/validators";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Table as TableType } from "@tanstack/react-table";
import { startCase } from "lodash";
import { useRouter } from "next/navigation";
import { FC } from "react";

type CustomersTableHeaderProps = {
  table: TableType<SelectCustomerSchema>;
};

const CustomersTableHeader: FC<CustomersTableHeaderProps> = ({ table }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id} className="bg-secondary">
            <div>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

type Props = {
  data: SelectCustomerSchema[];
};

const CustomersTable: FC<Props> = ({ data }) => {
  const router = useRouter();

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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
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
  );
};

export default CustomersTable;
