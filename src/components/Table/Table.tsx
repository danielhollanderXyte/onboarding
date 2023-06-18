import { Table as MantineTable, TextInput } from "@mantine/core";
import { ReactNode, useState } from "react";

interface Column {
  columnName: string;
  exactMatch: boolean;
  header: string;
  cellRenderer?: (row: any, column: Column) => ReactNode;
}
interface TableProps<T extends { id: number }> {
  data: T[];
  columns: Column[];
}

export function Table<T extends { id: number }>(props: TableProps<T>) {
  const [data, setData] = useState(props.data);
  const headers = props.columns.map((column, index) => (
    <th key={index}>{column.header}</th>
  ));

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    const currentColumn = event.target.name.toLowerCase();
    if (filterValue !== "") {
      const columns = props.columns;
      const filteredData = props.data.filter((value) => {
        for (let i = 0; i < columns.length; i++) {
          if (currentColumn === columns[i].columnName.toLowerCase()) {
            if (columns[i].exactMatch)
              return value[columns[i].columnName].toString() === filterValue;
            else
              return value[columns[i].columnName]
                .toString()
                .includes(filterValue);
          }
        }
      });
      setData(filteredData);
    } else setData(props.data);
  };
  const filters = props.columns.map((column, index) => (
    <td key={index}>
      <TextInput
        placeholder={`Filter by ${column.header}`}
        onChange={handleFilterChange}
        name={column.columnName}
      />
    </td>
  ));

  const rows = data.map((row) => (
    <tr key={row.id}>
      {props.columns.map((column, index) => (
        <td key={index}>
          {column.cellRenderer ? (
            column.cellRenderer(row)
          ) : (
            <>{row[column.columnName]} </>
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <MantineTable>
      <thead>
        <tr>{filters}</tr>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </MantineTable>
  );
}
