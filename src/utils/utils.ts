import { isEmpty } from "lodash";
import {
  type Column,
  type Filter,
  type Sort,
} from "../components/Table/Table.tsx";
export function getNextSortValue(value?: "asc" | "desc" | null) {
  switch (value) {
    case "asc":
      return null;
    case "desc":
      return "asc";
    case null:
      return "desc";
    default:
      return "asc";
  }
}

export function filterData<T>(
  data: T[],
  column: Filter,
  columnsArr: Column[]
): T[] {
  if (isEmpty(column)) return data;
  return data.filter((row) => {
    return Object.entries(column).every(([columnName, filterInputValue]) => {
      const exactMatchValue = columnsArr.find(
        (e) => e.columnName === columnName
      )?.exactMatch;

      const rowValue = row[columnName as keyof T] as string;
      if (exactMatchValue)
        return (
          rowValue.toString().toLowerCase() ===
          filterInputValue?.toString().toLowerCase()
        );
      else
        return rowValue
          .toString()
          .toLowerCase()
          .includes(filterInputValue?.toString().toLowerCase());
    });
  });
}

export function sortData<T>(data: T[], column: Sort): T[] {
  if (isEmpty(column)) return data;
  else {
    return data.sort((rowA, rowB) => {
      const columnName = Object.keys(column)[0];
      const direction = column[columnName];
      if (direction === null) return 0;
      const rowAValue = rowA[columnName as keyof T] as string;
      const rowBValue = rowB[columnName as keyof T] as string;
      return (
        rowAValue.toString().localeCompare(rowBValue.toString(), "en", {
          numeric: true,
        }) * (direction === "asc" ? 1 : -1)
      );
    });
  }
}
