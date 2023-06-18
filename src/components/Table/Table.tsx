import { Table as MantineTable, TextInput } from "@mantine/core";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { omit } from "lodash/fp";
import { isEmpty } from "lodash";
import { getNextSortValue } from "../../utils/utils.ts";

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

  const filterData = (data, column, columnsArr) => {
    if (isEmpty(column)) return data;
    return data.filter((row) => {
      return Object.entries(filtersState).every(
        ([columnName, filterInputValue]) => {
          const exactMatchValue = columnsArr.find(
            (e) => e.columnName === columnName
          )?.exactMatch;

          if (exactMatchValue)
            return (
              row[columnName].toString().toLowerCase() ===
              filterInputValue.toString().toLowerCase()
            );
          else
            return row[columnName]
              .toString()
              .toLowerCase()
              .includes(filterInputValue.toString().toLowerCase());
        }
      );
    });
  };

  const sortData = (data, column) => {
    if (isEmpty(column)) return data;
    else {
      return data.sort((rowA, rowB) => {
        const columnName = Object.keys(column)[0];
        const direction = sortState[columnName];
        if (direction === null) return 0;
        return (
          rowA[columnName]
            .toString()
            .localeCompare(rowB[columnName].toString(), "en", {
              numeric: true,
            }) * (direction === "asc" ? 1 : -1)
        );
      });
    }
  };

  const adjustedData = useMemo(() => {
    const filteredData = filterData(
      [...props.data],
      filtersState,
      props.columns
    );
    const sortedData = sortData(filteredData, sortState);

    return sortedData;
  }, [filtersState, sortState, props.data]);

  console.log(`filterState`, filtersState);
  console.log(`sortState`, sortState);

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
