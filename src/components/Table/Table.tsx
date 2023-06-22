import {
  Table as MantineTable,
  Pagination as MantinePagination,
  createStyles,
  Box,
} from "@mantine/core";

import { type ReactNode, useMemo, useState } from "react";

import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from "@tabler/icons-react";

import { omit } from "lodash/fp";

import { filterData, getMaximumPages, sortData } from "../../utils/utils.ts";

import { useElementSize } from "@mantine/hooks";

import { TableHead } from "./TableHead/TableHead.tsx";

import { TableBody } from "./TableBody/TableBody.tsx";

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

export function Table<T extends { id: number }>({
  columns,
  data,
  rowHeight,
}: TableProps<T>) {
  const { classes } = useStyles();
  const { ref: tableRef, height: tableHeight } = useElementSize();

  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});
  const [pageIndex, setPageIndex] = useState<number>(1);

  const adjustedTableHeight = (tableHeight / window.innerHeight) * tableHeight;

  const onDataFiltered = (inputValue, columnName) => {
    if (!inputValue && Boolean(filtersState[columnName])) {
      setFilters((prevState) => omit([columnName], prevState));
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: inputValue,
    }));
  };

  const onDataSorted = (sortDirection: string) => {
    setSorting(sortDirection);
  };

  const filteredData = useMemo(
    () => filterData([...data], filtersState, columns),
    [filtersState, data, columns]
  );

  const sortedData = useMemo(
    () => sortData(filteredData, sortState),
    [filteredData, sortState]
  );

  const paginatedData = useMemo(() => {
    const numberOfRows = Math.ceil(adjustedTableHeight / rowHeight);
    return sortedData.slice(
      (pageIndex - 1) * numberOfRows,
      (pageIndex - 1) * numberOfRows + numberOfRows
    );
  }, [pageIndex, adjustedTableHeight, sortedData, rowHeight]);

  return (
    <Box h="100%" className={classes.container}>
      <MantineTable className={classes.table}>
        <TableHead
          columns={columns}
          onDataSorted={onDataSorted}
          sortState={sortState}
          onDataFiltered={onDataFiltered}
          filtersState={filtersState}
        />
        <TableBody
          columns={columns}
          paginatedData={paginatedData}
          ref={tableRef}
        />
      </MantineTable>
      <Box>
        <MantinePagination
          total={getMaximumPages(
            sortedData.length,
            Math.ceil(adjustedTableHeight / rowHeight)
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
