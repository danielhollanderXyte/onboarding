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
  useEffect,
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

interface Pagination {
  pageSize: number;
}
interface TableProps<TData> {
  data: TData[];
  columns: Array<Column<TData>>;
  pagination: Pagination;
}

export type Sort = Record<string, "asc" | "desc" | null>;
export type Filter = Record<string, string>;

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const { classes } = useStyles();

  const { ref: tableRef, height: tableHeight } = useElementSize();

  const { ref: rowRef, height: rowHeight } = useElementSize();
  const [tableSizes, setTableSizes] = useState({
    tableHeight,
    rowHeight,
  });

  const [windowHeight, setWindowDimensions] = useState(window.innerHeight);
  const [numberOfRows, setNumberOfRows] = useState<number>(
    props.pagination.pageSize
  );

  const [filtersState, setFilters] = useState<Filter>({});
  const [sortState, setSorting] = useState<Sort>({});
  const [paginationResults, setPaginationResults] = useState<number>(1);

  useEffect(() => {
    setTableSizes({ tableHeight, rowHeight });

    const handleResize = () => {
      setWindowDimensions(window.innerHeight);
      setNumberOfRows(Math.ceil(windowHeight / rowHeight));
      console.log("numberOfRows", numberOfRows);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableHeight, rowHeight, windowHeight]);

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
  const paginatedData = useMemo(
    () =>
      sortedData.slice(
        (paginationResults - 1) * numberOfRows,
        (paginationResults - 1) * numberOfRows + numberOfRows
      ),
    [filtersState, sortState, paginationResults, props.data, numberOfRows]
  );

  const displaySortingIcon = (sortingStatus: string | null) => {
    if (sortingStatus === "desc") return <IconSortDescending />;
    else if (sortingStatus === "asc") return <IconSortAscending />;

    return null;
  };

  return (
    <Box h="100%" className={classes.container} p="xl">
      <MantineTable className={classes.table} ref={tableRef}>
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
          {paginatedData.map((row) => (
            <tr key={row.id} ref={rowRef}>
              {props.columns.map((column, index) => (
                <td key={index} className={classes.cell}>
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
      <div>windowSize: {windowHeight}</div>
      <div>tableSize: {tableSizes.tableHeight}</div>
      <div>rowSize: {tableSizes.rowHeight}</div>
      <MantinePagination
        total={getMaximumPages(sortedData.length, numberOfRows)}
        position="left"
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
        onChange={setPaginationResults}
        value={paginationResults}
      />
    </Box>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr min-content",
  },
  table: {
    // height: "500px", // Set the desired height here
    overflowY: "auto", // Add vertical scroll if needed
    height: "100% !important",

    thead: {
      marginBottom: theme.spacing.md,
    },
  },
  cell: {
    // fontSize: "1px",
  },
}));
