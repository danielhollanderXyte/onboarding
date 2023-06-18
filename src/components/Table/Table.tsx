import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

interface Column {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: any) => ReactNode;
  sortDirection: "asc" | "desc" | null;
}
interface TableProps<T extends { id: number }> {
  data: T[];
  columns: Column[];
}

interface Filter {
  name: "asc" | "desc" | null;
}
interface Sort {
  name: "asc" | "desc" | null;
}

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [filtersState, setFilters] = useState<Record<string, Filter>>({});
  const [sortState, setSorting] = useState<Record<string, Sort>>({});

  const handleSort = (event, columnName: string) => {
    setSorting((prevSorting) => {
      if (sortState[columnName] === undefined) sortState[columnName] = "asc";
      return {
        [columnName]: sortState[columnName] === "asc" ? "desc" : "asc",
      };
    });
    console.log(sortState);
  };

  const handleFilterChange = (event, currentColumn: Column) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [currentColumn.columnName]: event.target.value,
    }));
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

  const filteredData = useMemo(() => {
    const filteredData = props.data.filter((obj) => {
      let passesAllFilters = true;
      for (const key in filtersState) {
        if (filtersState[key] === "") continue;
        const exactMatchValue = props.columns.find(
          (e) => e.columnName === key
        )?.exactMatch;
        if (exactMatchValue) {
          if (obj[key].toString() !== filtersState[key]) {
            passesAllFilters = false;
            break;
          }
        } else {
          if (!obj[key].toString().includes(filtersState[key])) {
            passesAllFilters = false;
            break;
          }
        }
      }
      return passesAllFilters; // Return the result
    });
    console.log(sortState);

    const sortedData = filteredData.sort((rowA, rowB) => {
      for (const column in sortState) {
        const direction = sortState[column];
        return (
          rowA[column].toString().localeCompare(rowB[column].toString(), "en", {
            numeric: true,
          }) * (direction === "asc" ? 1 : -1)
        );
      }
    });

    return sortedData;
  }, [filtersState, sortState, props.data]);

  const headers = props.columns.map((column, index) => (
    <th
      key={index}
      onClick={(event) => {
        handleSort(event, column.columnName);
      }}
    >
      {column.header}{" "}
      {sortState[column.columnName] === "desc" || sortState === undefined ? (
        <IconSortDescending />
      ) : (
        <IconSortAscending />
      )}
    </th>
  ));

  const rows = filteredData.map((row: Record<string, any>) => (
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
