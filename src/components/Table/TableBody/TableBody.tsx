import React from "react";
import { type Column } from "../Table.tsx";

interface TableBodyProps<TData> {
  columns: Array<Column<TData>>;
  paginatedData: TData[];
}

export function TableBody({ columns, paginatedData }: TableBodyProps<TData>) {
  return (
    <tbody>
      {paginatedData.map((row) => (
        <tr key={row.id}>
          {columns.map((column, index) => (
            <td key={index}>
              {column.cellRenderer !== undefined ? (
                column.cellRenderer(row)
              ) : (
                <>{row[column.columnName as keyof T] as string} </>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
