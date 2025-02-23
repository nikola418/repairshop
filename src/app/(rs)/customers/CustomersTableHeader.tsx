import { Filter, TableHead, TableHeader, TableRow } from "@/components";
import { SelectCustomerSchema } from "@/validators";
import { flexRender, Table } from "@tanstack/react-table";
import { FC } from "react";

type CustomersTableHeaderProps = {
  table: Table<SelectCustomerSchema>;
};

const CustomersTableHeader: FC<CustomersTableHeaderProps> = ({ table }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id} className="bg-secondary py-1">
        {headerGroup.headers.map((header) => (
          <TableHead
            key={header.id}
            className={`${
              header.id === "actions" ? "grid place-content-start mt-1" : ""
            }`}
          >
            <div>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </div>
            {header.column.getCanFilter() ? (
              <div className="grid place-content-center">
                <Filter
                  filteredRows={table
                    .getFilteredRowModel()
                    .rows.map((row) => row.getValue(header.column.id))}
                  column={header.column}
                ></Filter>
              </div>
            ) : null}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

export default CustomersTableHeader;
