import { config } from "../components/Post/post.config.ts";
import { usePosts } from "../components/Post/hooks/posts.api.ts";
import { type ReactElement } from "react";
import { TableComponent } from "../components/Table/Table.tsx";

export function Posts(): ReactElement | ReactElement[] | null {
  const posts = usePosts();
  if (posts.isLoading) {
    return <div>Loading...</div>;
  }

  if (posts.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (posts.data == null) return null;

  return (
    <TableComponent
      data={posts.data}
      headers={config.table.main.headers}
      columns={config.table.main.rows}
    ></TableComponent>
  );
}
