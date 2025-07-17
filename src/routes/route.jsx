import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";

export const route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
