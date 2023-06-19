import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { omit } from "lodash/fp";
import { filterData, getNextSortValue, sortData } from "../../utils/utils.ts";

export interface Column {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: any) => ReactNode;
}

interface TableProps<T extends { id: number }> {
  data: T[];
  columns: Column[];
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
    if (sortingStatus === "asc") return <IconSortAscending />;
    if (sortingStatus === null) return <div></div>;
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
        {adjustedData.map((row: any) => (
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
        ))}
      </tbody>
    </MantineTable>
  );
}
