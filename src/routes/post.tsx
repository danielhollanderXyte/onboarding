import {
  usePost,
  useCommentPerPostId,
} from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Group, Space, Text } from "@mantine/core";

export function Post(): ReactElement | ReactElement[] | null {
  const postParams = useParams();
  const postId = postParams.postId as string;
  const post = usePost(postId);
  const comments = useCommentPerPostId(postId);
  if (post.isLoading || comments.isLoading) {
    return <div>Loading...</div>;
  }

  if (post.isError || comments.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (post.data === undefined || comments.data === undefined) return null;

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
          {comments.data.map((comment) => (
            <Text>
              <strong>Comment:</strong> {comment.body}
            </Text>
          ))}
        </Card>
      </Container>
    </>
  );
}
