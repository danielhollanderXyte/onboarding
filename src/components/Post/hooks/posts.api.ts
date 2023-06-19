import { getData } from "../../../api/api.utils.ts";
import { type CommentPost, type Post } from "../Post.types.ts";
import { useQuery } from "react-query";

export function usePost(id: string) {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () =>
      await getData<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`),
  });
}

export function useCommentPerPostId(postId: string) {
  return useQuery<CommentPost[]>({
    queryKey: ["comments", postId],
    queryFn: async () =>
      await getData<CommentPost[]>(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      ),
  });
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () =>
      await getData<Post[]>("https://jsonplaceholder.typicode.com/posts"),
  });
}
