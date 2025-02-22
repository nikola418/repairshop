import { Filter, TableHead, TableHeader, TableRow } from "@/components";
import { TicketSearchResult } from "@/lib";
import { flexRender, Table } from "@tanstack/react-table";
import { FC } from "react";

export type Row = TicketSearchResult[0];

type Props = {
  table: Table<Row>;
};

const TicketsTableHeader: FC<Props> = ({ table }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead
            key={header.id}
            className="bg-secondary py-1"
            style={{ width: header.getSize() }}
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
              <div className="grid place-content-center ">
                <Filter
                  column={header.column}
                  filteredRows={table
                    .getFilteredRowModel()
                    .rows.map((row) => row.getValue(header.column.id))}
                />
              </div>
            ) : null}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

export default TicketsTableHeader;
