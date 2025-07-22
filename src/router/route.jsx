import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import ShopPage from "../pages/Shop/ShopPage";
import CategoryDetails from "../pages/Category/CategoryDetails";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import PrivateRoute from "../routes/PrivateRoute";
import SignInForm from "../pages/Authentication/SignInForm";
import SignUpForm from "../pages/Authentication/SignUpForm";
import LoginPage from "../pages/Authentication/LoginPage";
import RegistrationPage from "../pages/Authentication/RegistrationPage";


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
  }
]);
