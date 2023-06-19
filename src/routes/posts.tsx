import { usePosts } from "../components/Post/hooks/posts.api.ts";
import {
  type ReactElement,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { type Column, Table } from "../components/Table/Table.tsx";
import {
  Alert,
  Anchor,
  Center,
  Container,
  Loader,
  Text,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { type Post } from "../components/Post/Post.types.ts";
import { IconAlertCircle, IconX } from "@tabler/icons-react";

export function Posts(): ReactElement | ReactElement[] | null {
  const posts = usePosts();
  const [postsData, setPostsData] = useState<Post[]>(posts.data);

  const adjustedData = useMemo(
    () => (postsData === undefined ? posts.data : postsData),
    [posts.data, postsData]
  );

  useEffect(() => {
    setPostsData(posts.data);
  }, [posts.data]);

  const handleDelete = useCallback(
    (row: Post) => {
      setPostsData((prevPostsData) => {
        return prevPostsData?.filter((post) => post.id !== row.id);
      });
    },
    [posts.data]
  );

  const columns: Array<Column<Post>> = useMemo(() => {
    return [
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
        cellRenderer: (row) => {
          return (
            <Text maw={400} truncate={true}>
              {row.body}
            </Text>
          );
        },
      },
      {
        columnName: "delete",
        exactMatch: true,
        header: "",
        cellRenderer: (row) => {
          return (
            <Button
              variant="default"
              color="reds"
              onClick={() => {
                handleDelete(row);
              }}
            >
              <IconX aria-label="Delete" color="red" />
            </Button>
          );
        },
      },
    ];
  }, []);

  if (posts.isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Loader />
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

  if (adjustedData === undefined) return null;

  const data = adjustedData.map((post, index) => ({
    ...post,
    id: !isNaN(post.id) ? post.id : index + 1,
  }));
  return <Table<Post> data={data} columns={columns} />;
}
