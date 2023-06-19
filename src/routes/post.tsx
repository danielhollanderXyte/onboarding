import {
  usePost,
  useCommentPerPostId,
} from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Space,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { type CommentPost } from "../components/Post/Post.types.ts";

export function Post(): ReactElement | ReactElement[] | null {
  const postParams = useParams();
  const postId = postParams.postId as string;
  const post = usePost(postId);
  const comments = useCommentPerPostId(postId);
  if (post.isLoading || comments.isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Loader />
      </Center>
    );
  }

  if (post.isError || comments.isError) {
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
  if (
    post.data === undefined ||
    comments.data === undefined ||
    comments.data === null
  )
    return null;

  return (
    <>
      <Space h="xs" />
      <Container size="35rem">
        <Card shadow="md" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={700}>{post.data.title}</Text>
          </Group>
          <Text>
            <strong>Post Body:</strong> {post.data.body}
          </Text>
          <Text>
            <strong>Id:</strong> {post.data.id}
          </Text>
          <Text>
            <strong>User Id:</strong> {post.data.userId}
          </Text>
          {comments.data.map((comment: CommentPost) => (
            <Text key={comment.id}>
              <strong>Comment:</strong> {comment.body}
            </Text>
          ))}
        </Card>
      </Container>
    </>
  );
}
