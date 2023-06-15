import { usePosts } from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { Table } from "../components/Table/Table.tsx";
import { Anchor, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Post } from "../components/Post/Post.types.ts";

const config = {
  table: {
    columns: [
      {
        columnName: "id",
        exactMatch: true,
        header: "Id",
        cellRenderer: (row: Post) => {
          return (
            <Anchor component={Link} to={`./${row.id}`}>
              {row.id}
            </Anchor>
          );
        },
      },
      {
        columnName: "title",
        exactMatch: false,
        header: "Title",
      },
      {
        columnName: "body",
        exactMatch: false,
        header: "Body",
        cellRenderer: (row: Post) => {
          // const classes = useStyles();
          return (
            <Text maw={400} truncate={true}>
              {row.body}
            </Text>
          );
        },
      },
    ],
  },
};

export function Posts(): ReactElement | ReactElement[] | null {
  const posts = usePosts();
  if (posts.isLoading) {
    return <div>Loading...</div>;
  }

  if (posts.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (posts.data === undefined) return null;
  const data = posts.data.map((post, index) => ({
    ...post,
    id: post.id ? post.id : index + 1,
  }));
  return <Table data={data} columns={config.table.columns} />;
}
