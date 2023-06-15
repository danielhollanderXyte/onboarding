import { getData } from "../../../api/api.utils.ts";
import { type Post } from "../Post.types.ts";
import { useQuery } from "react-query";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function usePost(id: string | undefined) {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () =>
      await getData<Post>(
        `https://jsonplaceholder.typicode.com/posts/${
          id === undefined ? "" : id
        }`
      ),
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCommentPerPostId(id: string | undefined) {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () =>
      await getData<Post>(
        `https://jsonplaceholder.typicode.com/comments?postId=${
          id === undefined ? "" : id
        }`
      ),
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () =>
      await getData<Post[]>("https://jsonplaceholder.typicode.com/posts"),
  });
}
