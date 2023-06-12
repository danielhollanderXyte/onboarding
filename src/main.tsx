import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Root, { loader as rootloader } from "./routes/root.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Users from "./routes/users.tsx";
import Posts from "./routes/posts.tsx";
import UserItem from "./components/User/User.tsx";
import usersList from "./components/User/users.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "users",
        element: <Users usersList={usersList} />,
      },
      // {
      //   path: "users/:usersId",
      //   element: <UserItem />,
      // },
      {
        path: "Posts",
        element: <Posts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
