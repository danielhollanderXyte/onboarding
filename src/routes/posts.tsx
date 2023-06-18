import { PostItem } from "../components/Post/Post.tsx";
import Post from "../components/Post/Post.types.ts";

interface PostList {
  postsList: Post[];
}

export function Posts(props: PostList) {
  return props.postsList.map((post) => (
    <PostItem key={post.id} text={post.text} id={post.id}></PostItem>
  ));
}
