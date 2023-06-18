import { usePosts } from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { Table } from "../components/Table/Table.tsx";
import { Alert, Anchor, Center, Container, Loader, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { type Post } from "../components/Post/Post.types.ts";
import { IconAlertCircle } from "@tabler/icons-react";

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
        sortDirection: "asc",
      },
      {
        columnName: "title",
        exactMatch: false,
        header: "Title",
        sortDirection: null,
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
        sortDirection: null,
      },
    ],
  },
};

export function Posts(): ReactElement | ReactElement[] | null {
  const posts = usePosts();
  if (posts.isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        return <Loader />;
      </Center>
    );
  }

  if (posts.isError) {
    return (
      <Container size="30rem" px={10}>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Bummer!"
          color="red"
        >
          Error: Oh no!
        </Alert>
      </Container>
    );
  }
  if (posts.data === undefined) return null;
  const data = posts.data.map((post, index) => ({
    ...post,
    id: !Number.isNaN(post.id) ? post.id : index + 1,
  }));
  return <Table data={data} columns={config.table.columns} />;
}
