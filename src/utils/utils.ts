import { isEmpty } from "lodash";

export function flattenNestedObject(obj: {}) {
  const result: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      const nestedObject = flattenNestedObject(value);
      Object.entries(nestedObject).forEach(([nestedKey, nestedValue]) => {
        result[`${key}${nestedKey}`] = nestedValue;
      });
    } else {
      result[key] = value;
    }
  });

  return result;
}

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

export function filterData(data, column, columnsArr, filtersState) {
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
}

export function sortData(data, column) {
  if (isEmpty(column)) return data;
  else {
    return data.sort((rowA, rowB) => {
      const columnName = Object.keys(column)[0];
      const direction = column[columnName];
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
}
