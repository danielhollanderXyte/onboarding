import {
  usePost,
  useCommentPerPostId,
} from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Group, Space, Text } from "@mantine/core";

export function Post(): ReactElement | ReactElement[] | null {
  const { postId } = useParams();
  const post = usePost(postId);
  const comment = useCommentPerPostId(postId);
  if (post.isLoading || comment.isLoading) {
    return <div>Loading...</div>;
  }

  if (post.isError || comment.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (post.data === undefined || comment.data === undefined) return null;

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
          <Text>
            <strong>Comment:</strong> {comment.data.body}
          </Text>
        </Card>
      </Container>
    </>
  );
}
