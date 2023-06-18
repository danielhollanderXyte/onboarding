import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { omit } from "lodash/fp";
import { filterData, getNextSortValue, sortData } from "../../utils/utils.ts";

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

type Sort = Record<string, "asc" | "desc" | null>;
type Filter = Record<string, string>;

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});

  const handleSort = (event, columnName: string) => {
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
      props.columns,
      filtersState
    );
    const sortedData = sortData(filteredData, sortState);

    return sortedData;
  }, [filtersState, sortState, props.data]);

  return (
    <MantineTable>
      <thead>
        <tr>{filters}</tr>
        <tr>
          {props.columns.map((column, index) => (
            <th
              key={index}
              onClick={(event) => {
                handleSort(event, column.columnName);
              }}
            >
              {column.header}{" "}
              {sortState[column.columnName] === "desc" ||
              sortState === undefined ? (
                <IconSortDescending />
              ) : (
                <IconSortAscending />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {adjustedData.map((row: Record<string, any>) => (
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
