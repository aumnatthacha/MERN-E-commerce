import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ProductList from "../pages/shop/ProductList";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Signin from "../components/Signin";
import Home from "../pages/Home/Home";
import DashBoard from "../layout/DashBoard";
import AdminRouter from "../PrivateRouter/AdminRouter";
import UserList from "../components/Admin/UserList";
import CreateProducts from "../components/Admin/AddProducts";
import UpdateProducts from "../components/Admin/ProductListUpdate";
import UpdateProductById from "../components/Admin/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRouter>
        <DashBoard />
      </AdminRouter>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: <UserList />,
      },
      {
        path: "/dashboard/createProduct",
        element: <CreateProducts />,
      },
      {
        path: "/dashboard/listProduct",
        element: <UpdateProducts />,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateProductById />,
      },
    ],
  },
]);

export default router;
