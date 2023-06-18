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
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const routerDefinitions = createRoutesFromElements(
  <Route element={<Root />} errorElement={<ErrorPage />}>
    <Route path="/" element={<App />} />
    <Route path="users" element={<Users />} />
    <Route path="posts" element={<Posts />} />
    <Route path="users/:usersId" element={<Users />} />
    <Route path="posts/:postsId" element={<Posts />} />
  </Route>
);

const router = createBrowserRouter(routerDefinitions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
