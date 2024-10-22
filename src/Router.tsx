import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ImageDetails } from "./components";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/photo/:id",
        element: <ImageDetails />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
