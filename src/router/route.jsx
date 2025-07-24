import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import ShopPage from "../pages/Shop/ShopPage";
import CategoryDetails from "../pages/Category/CategoryDetails";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import PrivateRoute from "../routes/PrivateRoute";

import LoginPage from "../pages/Authentication/LoginPage";

import InvoicePage from "../pages/InvoicePage";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageCategory from "../pages/Dashboard/ManageCategory";


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
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/checkout',
    element: <PrivateRoute><Checkout /></PrivateRoute>,
  },
  {
    path: '/invoice',
    element: <InvoicePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: '/dashboard/admin-home',
        element: <AdminHome />,
      },
      {
        path: '/dashboard/manage-users',
        element: <ManageUsers />,
      },
      {
        path: '/dashboard/manage-category',
        element: <ManageCategory />,
      },
    ],
  },
]);
