import { PostItem } from "../components/Post/PostItem.tsx";
import { config } from "../components/Post/post.config.ts";
import { useGet } from "../hooks/useGet.ts";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post.types.ts";

export function Posts() {
  const { postsId } = useParams();
  const { isLoading, isError, data } = useGet(config.url, postsId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Oh no!</div>;
  }
  //Changed this to be more meaningful name as "data" is not very descriptive
  let postsData = data;
  console.log(postsData);

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
