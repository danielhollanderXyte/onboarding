import { PostItem } from "../components/Post/PostItem.tsx";
import { config } from "../components/Post/post.config.ts";
import { useGet } from "../hooks/useGet.ts";
import { useParams } from "react-router-dom";
import TableComponent from "../components/Table/Table.tsx";
import Post from "../components/Post/Post.types.ts";

export function Posts() {
  const { postsId } = useParams();
  const { isLoading, isError, data: postsData } = useGet(config.url, postsId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Oh no!</div>;
  }

  return postsData?.map((post: Post) => (
    <PostItem
      title={post.title}
      id={post.id}
      userId={post.userId}
      body={post.body}
      key={post.id}
    />
  ));
}
