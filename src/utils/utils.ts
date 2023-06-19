import { isEmpty, toLower } from "lodash";
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
  filter: Filter,
  columnsArr: Column[]
): T[] {
  if (isEmpty(filter)) return data;
  return data.filter((row) => {
    return Object.entries(filter).every(([columnName, filterInputValue]) => {
      const isExactMatch = columnsArr.find(
        (e) => e.columnName === columnName
      )?.exactMatch;

      const rowValue = row[columnName as keyof T] as string;
      if (isExactMatch) return toLower(rowValue) === toLower(filterInputValue);
      else return toLower(rowValue).includes(toLower(filterInputValue));
    });
  });
}

export function sortData<T>(data: T[], sort: Sort): T[] {
  if (isEmpty(sort)) return data;
  else {
    return data.sort((rowA, rowB) => {
      const columnName = Object.keys(sort)[0];
      const direction = sort[columnName];
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
