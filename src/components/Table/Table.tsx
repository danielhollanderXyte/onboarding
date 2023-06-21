import {
  Table as MantineTable,
  TextInput,
  Pagination as MantinePagination,
  createStyles,
  Box,
} from "@mantine/core";

import {
  type ChangeEvent,
  type ReactNode,
  // useEffect,
  useMemo,
  useState,
} from "react";

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

import { useElementSize } from "@mantine/hooks";

export interface Column<TData> {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: TData) => ReactNode;
  isFilterable: boolean;
}

interface TableProps<TData> {
  data: TData[];
  columns: Array<Column<TData>>;
  rowHeight: number;
}

export type Sort = Record<string, "asc" | "desc" | null>;
export type Filter = Record<string, string>;

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const { classes } = useStyles();

  const { ref: tableRef, height: tableHeight } = useElementSize();

  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});
  const [pageIndex, setPageIndex] = useState<number>(1);

  const adjustedTableHeight = useMemo(
    () => (tableHeight / window.innerHeight) * tableHeight,
    [tableHeight]
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

  const filters = props.columns.map(
    (column, index) =>
      column.isFilterable && (
        <td key={index}>
          <TextInput
            placeholder={`Filter by ${column.header}`}
            onChange={(event) => {
              handleFilterChange(event, column.columnName);
            }}
          />
        </td>
      )
  );

  const filteredData = useMemo(
    () => filterData([...props.data], filtersState, props.columns),
    [filtersState, props.data]
  );

  const sortedData = useMemo(
    () => sortData(filteredData, sortState),
    [filteredData, sortState]
  );

  const paginatedData = useMemo(() => {
    const numberOfRows = Math.ceil(adjustedTableHeight / props.rowHeight);
    return sortedData.slice(
      (pageIndex - 1) * numberOfRows,
      (pageIndex - 1) * numberOfRows + numberOfRows
    );
  }, [
    filtersState,
    sortState,
    pageIndex,
    props.data,
    tableHeight,
    adjustedTableHeight,
  ]);

  const displaySortingIcon = (sortingStatus: string | null) => {
    if (sortingStatus === "desc") return <IconSortDescending />;
    else if (sortingStatus === "asc") return <IconSortAscending />;

    return null;
  };

  return (
    <Box h="100%" className={classes.container}>
      <MantineTable className={classes.table}>
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
        <tbody ref={tableRef}>
          {paginatedData.map((row) => (
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
      <Box>
        <MantinePagination
          total={getMaximumPages(
            sortedData.length,
            Math.ceil(tableHeight / props.rowHeight)
          )}
          position="left"
          withEdges
          nextIcon={IconArrowRight}
          previousIcon={IconArrowLeft}
          firstIcon={IconArrowBarToLeft}
          lastIcon={IconArrowBarToRight}
          dotsIcon={IconGripHorizontal}
          onChange={setPageIndex}
          value={pageIndex}
        />
      </Box>
    </Box>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr min-content",
    padding: `50px`,
  },
  table: {
    overflowY: "auto", // Add vertical scroll if needed
    height: "100%",
    thead: {
      marginBottom: theme.spacing.md,
    },
    tbody: {
      height: "100%",
    },
  },
}));
