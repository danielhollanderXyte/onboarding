import PostItem from "../components/Post/Post";
import { FC } from "react";
import Post from "../Models/Post";

interface PostList {
  postsList: Post[];
}

const Users: FC<PostList> = (props: PostList) => {
  return props.postsList.map((post) => (
    <PostItem key={post.id} text={post.text} id={post.id}></PostItem>
  ));
};

export default Users;
