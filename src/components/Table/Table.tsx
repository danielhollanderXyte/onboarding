import { Table } from "@mantine/core";
import { FC } from "react";
import TableModel from "../../models/Table";
import React from "react";

const TableComponent: FC<TableModel> = (props: TableModel) => {
  return <Table />;
};

export default TableComponent;
