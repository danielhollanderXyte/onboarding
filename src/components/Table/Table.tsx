import {
  Table as MantineTable,
  TextInput,
  Pagination as MantinePagination,
} from "@mantine/core";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { omit } from "lodash/fp";
import {
  filterData,
  getMaximumPages,
  getNextSortValue,
  sortData,
} from "../../utils/utils.ts";

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
interface PaginationResults {
  firstResultIndex: number;
  lastResultIndex: number;
}
export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});
  const [paginationResults, setPaginationResults] = useState<PaginationResults>(
    {
      firstResultIndex: 0,
      lastResultIndex: props.pagination.limit,
    }
  );

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
    const paginatedData = sortedData.slice(
      paginationResults.firstResultIndex,
      paginationResults.lastResultIndex
    );
    return { paginatedData, sortedData };
  }, [filtersState, sortState, props.data, paginationResults]);

  const displaySortingIcon = (sortingStatus: string | null) => {
    if (sortingStatus === "desc") return <IconSortDescending />;
    else if (sortingStatus === "asc") return <IconSortAscending />;

    return null;
  };

  const handlePaginationChange = (page: number) => {
    const firstResultIndex =
      props.pagination.limit * page - props.pagination.limit;

    const lastResultIndex = props.pagination.limit * page;

    setPaginationResults({ firstResultIndex, lastResultIndex });
  };

  return (
    <>
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
                {column.header}{" "}
                {displaySortingIcon(sortState[column.columnName])}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adjustedData.paginatedData.map((row) => (
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
      <MantinePagination
        total={getMaximumPages(
          adjustedData.sortedData.length,
          props.pagination.limit
        )}
        position="left"
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
        onChange={handlePaginationChange}
      />
    </>
  );
}
