import React, { type ChangeEvent, useState } from "react";
import { type Column, type Filter } from "../Table.tsx";
import { TextInput } from "@mantine/core";
import { omit } from "lodash/fp";

interface FiltersProps {
  columns: Array<Column<[]>>;
  filtersState: Filter;
  handleFilters: (filter: Filter) => void;
}

export function Filters({
  filtersState,
  columns,
  handleFilters,
}: FiltersProps) {
  // const [filtersState, setFilters] = useState<Filter>({});

  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    columnName: string
  ) => {
    handleFilters(event.target.value, columnName);
  };

  return (
    <tr>
      {columns.map((column, index) =>
        column.isFilterable ? (
          <td key={index}>
            <TextInput
              placeholder={`Filter by ${column.header}`}
              onChange={(event) => {
                handleFilterChange(event, column.columnName);
              }}
            />
          </td>
        ) : null
      )}
    </tr>
  );
}
