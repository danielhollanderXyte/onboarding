import { Table } from "@mantine/core";
import { FC } from "react";
import TableModel from "./Table.types";
import React from "react";

const TableComponent: FC<TableModel> = (props: TableModel) => {
  const rows = props.rows.map((row) => {
    return (
      <tr>
        <td>{row.name}</td>
        <td>{row.id}</td>
        <td>{row.username}</td>
        <td>{row.email}</td>
      </tr>
    );
  });

  return <Table />;
};

export default TableComponent;
