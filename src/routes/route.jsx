import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import ShopPage from "../pages/Shop/ShopPage";
import CategoryDetails from "../pages/Category/CategoryDetails";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";


export const route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/shops",
        element: <ShopPage />,
      },

      {
        path: '/category/:categoryName',
        element: <CategoryDetails />,
      },
    ],
  },
  {
    path: '/checkout',
    element: <Checkout />,
  }
]);
