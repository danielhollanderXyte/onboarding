import Post from "./Post.types.ts";
import { Anchor } from "@mantine/core";

export function PostItem(props: Post) {
  return (
    <div>
      <Anchor href={`/posts/${props.id}`}>
        <h4>{props.title}</h4>
        <div>{props.body}</div>
      </Anchor>
    </div>
  );
}
