import Post from "./Post.types.ts";
import { Anchor } from "@mantine/core";
import { useParams } from "react-router-dom";

export function PostItem(props: Post) {
  let showUser = (
    <div>
      <Anchor href={`/posts/${props.id}`}>{props.text}</Anchor>
    </div>
  );

  const { postsId } = useParams();
  if (postsId == props.id) return showUser;
  if (postsId == undefined) return showUser;
}
