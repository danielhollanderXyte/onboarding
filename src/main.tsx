import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Root } from "./routes/root.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorPage } from "./error-page.tsx";
import { Users } from "./routes/Users.tsx";
import { User } from "./routes/user.tsx";
import { Posts } from "./routes/Posts.tsx";
import { Post } from "./routes/post.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

const routerDefinitions = createRoutesFromElements(
  <Route element={<Root />} errorElement={<ErrorPage />}>
    <Route path="/" element={<App />} />
    <Route path="users" element={<Users />} />
    <Route path="posts" element={<Posts />} />
    <Route path="users/:userId" element={<User />} />
    <Route path="posts/:postId" element={<Post />} />
  </Route>
);

const router = createBrowserRouter(routerDefinitions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: () => ({
          "html, body, #root, #root > div": {
            height: "100%",
            width: "100%",
          },
        }),
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
