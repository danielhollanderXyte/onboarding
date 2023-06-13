import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Root from "./routes/root.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorPage } from "./error-page.tsx";
import { Users } from "./routes/users.tsx";
import { Posts } from "./routes/posts.tsx";
import { UserItem } from "./components/User/User.tsx";
import { usersList } from "./components/User/users.constans.ts";
import { postsList } from "./components/Post/posts.constants.ts";
import { PostItem } from "./components/Post/Post.tsx";

const routerDefinitions = createRoutesFromElements(
  <Route element={<Root />} errorElement={<ErrorPage />}>
    <Route path="/" element={<App />} />
    <Route path="users" element={<Users usersList={usersList} />} />
    <Route path="posts" element={<Posts postsList={postsList} />} />
    <Route
      path="users/:usersId"
      element={usersList.map((user) => (
        <UserItem key={user.id} text={user.text} id={user.id}></UserItem>
      ))}
    />
    <Route
      path="posts/:postsId"
      element={postsList.map((post) => (
        <PostItem key={post.id} text={post.text} id={post.id}></PostItem>
      ))}
    />
  </Route>
);

const router = createBrowserRouter(routerDefinitions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
