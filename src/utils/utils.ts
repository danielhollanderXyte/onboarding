import { isEmpty, toLower, orderBy } from "lodash";
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

export function filterData<TData>(
  data: TData[],
  filter: Filter,
  columnsArr: Array<Column<TData>>
): TData[] {
  if (isEmpty(filter)) return data;

  return data.filter((row) => {
    return Object.entries(filter).every(([columnName, filterInputValue]) => {
      const isExactMatch = columnsArr.find(
        (e) => e.columnName === columnName
      )?.exactMatch;

      const rowValue = row[columnName as keyof TData] as string;

      if (isExactMatch) return toLower(rowValue) === toLower(filterInputValue);
      else return toLower(rowValue).includes(toLower(filterInputValue));
    });
  });
}

export function sortData<T>(data: T[], sort: Sort): T[] {
  if (isEmpty(sort)) return data;
  else {
    return orderBy(data, Object.keys(sort)[0], Object.values(sort)[0]);
  }
}

export function getMaximumPages(totalRows: number, rowsPerPage: number) {
  return Math.ceil(totalRows / rowsPerPage);
}
