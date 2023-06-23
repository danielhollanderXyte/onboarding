import { type Column, type Sort, type Filter } from "../Table.tsx";
import { getNextSortValue } from "../../../utils/utils.ts";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

import { Filters } from "../Filters/Filters.tsx";
interface TableHeadProps<TData> {
  columns: Array<Column<TData>>;
  onDataSorted: (columnName: Sort) => void;
  sortState: Sort;
  filtersState: Filter;
  onDataFiltered: (filter: string, column: string) => void;
}

export function TableHead<TData>({
  columns,
  onDataSorted,
  sortState,
  filtersState,
  onDataFiltered,
}: TableHeadProps<TData>) {
  const handleSort = (columnName: string) => {
    onDataSorted(
      sortState[columnName] === undefined
        ? { [columnName]: "desc" }
        : { [columnName]: getNextSortValue(sortState[columnName]) }
    );
  };

  const displaySortingIcon = (sortingStatus: string | null) => {
    if (sortingStatus === "desc") return <IconSortDescending />;
    else if (sortingStatus === "asc") return <IconSortAscending />;

    return null;
  };

  return (
    <thead>
      <Filters
        columns={columns}
        filtersState={filtersState}
        handleFilters={onDataFiltered}
      />
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            onClick={() => {
              handleSort(column.columnName);
            }}
          >
            {column.header} {displaySortingIcon(sortState[column.columnName])}
          </th>
        ))}
      </tr>
    </thead>
  );
}
