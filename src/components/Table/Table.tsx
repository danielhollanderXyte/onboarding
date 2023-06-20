import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { omit } from "lodash/fp";
import { filterData, getNextSortValue, sortData } from "../../utils/utils.ts";

export interface Column<TData> {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: TData) => ReactNode;
}

interface Pagination {
  limit: number;
  showResults: number[];
}
interface TableProps<TData> {
  data: TData[];
  columns: Array<Column<TData>>;
  pagination: Pagination;
}

export type Sort = Record<string, "asc" | "desc" | null>;
export type Filter = Record<string, string>;

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});

  const handleSort = (columnName: string) => {
    setSorting((prevSorting) => {
      const updatedSortState = { ...prevSorting };

      if (updatedSortState[columnName] === undefined) {
        updatedSortState[columnName] = "desc";
        return {
          [columnName]: updatedSortState[columnName],
        };
      }

      const order = getNextSortValue(sortState[columnName]);
      return {
        [columnName]: order,
      };
    });
  };

  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    currentColumn: string
  ) => {
    if (!event.target.value && Boolean(filtersState[currentColumn])) {
      setFilters((prevState) => omit([currentColumn], prevState));
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [currentColumn]: event.target.value,
    }));
  };

  const filters = props.columns.map((column, index) => (
    <td key={index}>
      <TextInput
        placeholder={`Filter by ${column.header}`}
        onChange={(event) => {
          handleFilterChange(event, column.columnName);
        }}
      />
    </td>
  ));

  const adjustedData = useMemo(() => {
    const filteredData = filterData(
      [...props.data],
      filtersState,
      props.columns
    );
    const sortedData = sortData(filteredData, sortState);

    return sortedData;
  }, [filtersState, sortState, props.data]);

  const displaySortingIcon = (sortingStatus: string | null) => {
    if (sortingStatus === "desc") return <IconSortDescending />;
    else if (sortingStatus === "asc") return <IconSortAscending />;

    return null;
  };

  return (
    <MantineTable>
      <thead>
        <tr>{filters}</tr>
        <tr>
          {props.columns.map((column, index) => (
            <th
              key={index}
              onClick={() => {
                handleSort(column.columnName);
              }}
            >
              {column.header} {displaySortingIcon(sortState[column.columnName])}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {adjustedData.map((row) => (
          <tr key={row.id}>
            {props.columns.map((column, index) => (
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
    </MantineTable>
  );
}
