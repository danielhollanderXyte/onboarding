import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Root from "./routes/root.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Users from "./routes/users.tsx";
import Posts from "./routes/posts.tsx";
import UserItem from "./components/User/User.tsx";
import usersList from "./components/User/users.ts";
import postsList from "./components/Post/posts.ts";
import PostItem from "./components/Post/Post.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "users",
        element: <Users usersList={usersList} />,
      },
      {
        path: "users/:usersId",
        element: usersList.map((user) => (
          <UserItem key={user.id} text={user.text} id={user.id}></UserItem>
        )),
      },
      {
        path: "posts",
        element: <Posts postsList={postsList} />,
      },
      {
        path: "posts/:postsId",
        element: postsList.map((post) => (
          <PostItem key={post.id} text={post.text} id={post.id}></PostItem>
        )),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
