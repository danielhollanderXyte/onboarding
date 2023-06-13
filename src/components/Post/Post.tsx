import { FC, useState } from "react";
// import styles from "./Users.module.css";
import Post from "../../Models/Post";
import { Anchor } from "@mantine/core";
import { useParams } from "react-router-dom";

const PostItem: FC<Post> = (props: Post) => {
  const [post] = useState<Post>(props);
  let showUser = (
    <div>
      <Anchor href={`/posts/${props.id}`}>{props.text}</Anchor>
    </div>
  );

  const { postsId } = useParams();
  if (postsId == post.id) return showUser;
  if (postsId == undefined) return showUser;
};

export default PostItem;
