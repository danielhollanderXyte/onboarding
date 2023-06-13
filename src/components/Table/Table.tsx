import { Table } from "@mantine/core";
import { FC } from "react";
import TableModel from "./Table.types";
import React from "react";

const TableComponent: FC<TableModel> = (props: TableModel) => {
  return <Table />;
};

export default TableComponent;
