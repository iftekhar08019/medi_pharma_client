import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import ShopPage from "../pages/Shop/ShopPage";
import CategoryDetails from "../pages/Category/CategoryDetails";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import PrivateRoute from "../routes/PrivateRoute";

import LoginPage from "../pages/Authentication/LoginPage";
import UpdateProfile from "../pages/Profile/UpdateProfile";

import InvoicePage from "../pages/InvoicePage";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";
import ManagePayments from "../pages/Dashboard/Admin/ManagePayments";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import ManageBannerAdvertise from "../pages/Dashboard/Admin/ManageBannerAdvertise";
import AdminRoute from "../routes/AdminRoute";
import SellerRoute from "../routes/SellerRoute";
import RoleRedirect from "../pages/Dashboard/RoleRedirect";
import UserHome from "../pages/Dashboard/User/UserPaymentHistory";
import SellerHome from "../pages/Dashboard/Seller/SellerHome";
import ManageMedicines from "../pages/Dashboard/Seller/ManageMedicines";
import PaymentHistory from "../pages/Dashboard/Seller/PaymentHistory";
import AskForAdvertisement from "../pages/Dashboard/Seller/AskForAdvertisement";
import UserPaymentHistory from "../pages/Dashboard/User/UserPaymentHistory";

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
        path: "/category/:categoryName",
        element: <CategoryDetails />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    path: "/invoice",
    element: <InvoicePage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: RoleRedirect, // Redirects based on user role
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "seller-home",
        element: (
          <SellerRoute>
            <SellerHome />
          </SellerRoute>
        ),
      },
      {
        path: "manage-medicines",
        element: (
          <SellerRoute>
            <ManageMedicines />
          </SellerRoute>
        ),
      },
      {
        path: "seller-payments",
        element: (
          <SellerRoute>
            <PaymentHistory />
          </SellerRoute>
        ),
      },
      {
        path: "seller-advertise",
        element: (
          <SellerRoute>
            <AskForAdvertisement />
          </SellerRoute>
        ),
      },
      {
        path: "user-payments",
        element: (
          <PrivateRoute>
            <UserPaymentHistory />
          </PrivateRoute>
        ),
      },
      // **NO SLASH!**
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <AdminRoute>
            <ManageCategory />
          </AdminRoute>
        ),
      },
      {
        path: "payment-management",
        element: (
          <AdminRoute>
            <ManagePayments />
          </AdminRoute>
        ),
      },
      {
        path: "sales-report",
        element: (
          <AdminRoute>
            <SalesReport />
          </AdminRoute>
        ),
      },
      {
        path: "manage-banner",
        element: (
          <AdminRoute>
            <ManageBannerAdvertise />
          </AdminRoute>
        ),
      },
    ],
  },
]);
