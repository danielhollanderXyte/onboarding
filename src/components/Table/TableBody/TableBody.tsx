import { type Column } from "../Table.tsx";

interface TableBodyProps<TData> {
  columns: Array<Column<TData>>;
  paginatedData: TData[];
  keyField: keyof TData;
}

export function TableBody<TData>({
  columns,
  paginatedData,
  keyField,
}: TableBodyProps<TData>) {
  return (
    <tbody>
      {paginatedData.map((row) => (
        <tr key={row[keyField] as string}>
          {columns.map((column, index) => (
            <td key={index}>
              {column.cellRenderer !== undefined ? (
                column.cellRenderer(row)
              ) : (
                <>{row[column.columnName as keyof TData] as string} </>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
