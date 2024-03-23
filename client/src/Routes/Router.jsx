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
      <DashBoard/>  
      </AdminRouter>
    ),
      children : [
        {
          path: "/dashboard/users",
          element: <UserList />,
        },
      ]
  }
]);

export default router;
