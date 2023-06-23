import { type Column, type Filter } from "../Table.tsx";
import { TextInput } from "@mantine/core";

interface FiltersProps<TData> {
  columns: Array<Column<TData>>;
  filtersState: Filter;
  handleFilters: (filter: string, column: string) => void;
}

export function Filters<TData>({
  columns,
  handleFilters,
}: FiltersProps<TData>) {
  // const [filtersState, setFilters] = useState<Filter>({});

  const handleFilterChange = (inputValue: string, columnName: string) => {
    handleFilters(inputValue, columnName);
  };

  return (
    <tr>
      {columns.map((column, index) =>
        column.isFilterable ? (
          <td key={index}>
            <TextInput
              placeholder={`Filter by ${column.header}`}
              onChange={(e) => {
                handleFilterChange(e.target.value, column.columnName);
              }}
            />
          </td>
        ) : null
      )}
    </tr>
  );
}
