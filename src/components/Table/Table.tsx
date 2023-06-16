import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ReactNode, useState } from "react";

interface Column {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: any) => ReactNode;
}
interface TableProps<T extends { id: number }> {
  data: T[];
  columns: Column[];
}
type SortDirection = "asc" | "desc";

type ColumnSortState = Record<string, SortDirection>;

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [data, setData] = useState(props.data);
  const [columnSortState, setColumnSortState] = useState<ColumnSortState>({});

  const handleSort = (event, columnName: string) => {
    setColumnSortState((prevState) => {
      const currentDirection = prevState[columnName];
      let newDirection: SortDirection = "asc"; // Default sorting direction

      if (currentDirection === "asc") {
        newDirection = "desc";
      } else {
        newDirection = "asc"; // Reset to default
      }

      return {
        ...prevState,
        [columnName]: newDirection,
      };
    });
    data.sort(
      (rowA, rowB) =>
        rowA[columnName]
          .toString()
          .localeCompare(rowB[columnName].toString(), "en", {
            numeric: true,
          }) * (columnSortState[columnName] === "asc" ? 1 : -1)
    );
  };
  const headers = props.columns.map((column, index) => (
    <th
      key={index}
      onClick={(event) => {
        handleSort(event, column.columnName);
      }}
    >
      {column.header}
    </th>
  ));

  const handleFilterChange = (event, currentColumn: Column) => {
    const filterValue = event.target.value;
    if (filterValue !== "") {
      const columns = props.columns;
      const filteredData = props.data.filter((value: Record<string, any>) => {
        for (let i = 0; i < columns.length; i++) {
          if (
            currentColumn.columnName.toLowerCase() ===
            columns[i].columnName.toLowerCase()
          ) {
            if (columns[i].exactMatch)
              return value[columns[i].columnName].toString() === filterValue;
            else
              return value[columns[i].columnName]
                .toString()
                .includes(filterValue);
          }
        }
        return null;
      });
      setData(filteredData);
    } else setData(props.data);
  };
  const filters = props.columns.map((column, index) => (
    <td key={index}>
      <TextInput
        placeholder={`Filter by ${column.header}`}
        onChange={(event) => {
          handleFilterChange(event, column);
        }}
      />
    </td>
  ));

  const rows = data.map((row: Record<string, any>) => (
    <tr key={row.id}>
      {props.columns.map((column, index) => (
        <td key={index}>
          {column.cellRenderer != null ? (
            column.cellRenderer(row)
          ) : (
            <>{row[column.columnName]} </>
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <MantineTable>
      <thead>
        <tr>{filters}</tr>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </MantineTable>
  );
}
