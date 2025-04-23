import Cookies from "js-cookie";
import { createBrowserRouter, Navigate } from "react-router";

import AddProductForm from "./components/AddProductForm";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ProductsList from "./components/ProductsList";
import Reports from "./components/Reports";
import HomeLayout from "./layout/HomeLayout";
import LoginWrapper from "./pages/login/LoginWrapper";

const PrivateRoute = ({ Component: Component }) => {
  const token = Cookies.get("jwt-token");

  return token ? <Component /> : <Navigate to='/login' />;
};

export const router = createBrowserRouter([
  {
    path: "",
    element: <PrivateRoute Component={HomeLayout} />,
    children: [
      {
        path: "",
        element: <PrivateRoute Component={Dashboard} />,
      },
      {
        path: "products",
        element: <PrivateRoute Component={Products} />,
        children: [
          {
            path: "",
            element: <PrivateRoute Component={ProductsList} />,
          },
          {
            path:"add",
            element:<PrivateRoute Component={AddProductForm} />
          },
          {
            path:"edit/:id",
            element:<PrivateRoute Component={AddProductForm} />
          }
        ],
      },
      {
        path: "reports",
        element: <PrivateRoute Component={Reports} />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginWrapper />,
  },
]);
