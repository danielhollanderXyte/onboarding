import { Anchor, Table, createStyles } from "@mantine/core";
import { type ReactElement } from "react";
import { type User } from "../User/User.types.ts";
import { type Post } from "../Post/Post.types.ts";
import { Link } from "react-router-dom";

interface Row {
  columnName: string;
  anchor: boolean;
}
interface TableModel {
  data: User[] | Post[];
  headers: string[];
  columns: Row[];
}

const useStyles = createStyles(() => ({
  postBody: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "100px",
    whiteSpace: "nowrap",
  },
}));
export function TableComponent(props: TableModel): ReactElement {
  const classes = useStyles();
  const headers = props.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = props.data.map((value) => (
    <tr key={value.id}>
      {props.columns.map((column, index) =>
        column.anchor ? (
          <td key={index}>
            <Anchor key={index} component={Link} to={`./${value.id}`}>
              {value[column.columnName]}
            </Anchor>
          </td>
        ) : (
          <td
            key={index}
            className={
              column.columnName === "body" ? classes.classes.postBody : ""
            }
          >
            {value[column.columnName]}
          </td>
        )
      )}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
