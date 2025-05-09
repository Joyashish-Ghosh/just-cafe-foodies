import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Home/Home/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ChefRoute from "./ChefRoute";
import ChefHome from "../pages/ChefHome/Chefhome";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "./../pages/Dashboard/PaymentHistory/PaymentHistory";
import Review from "../pages/Dashboard/Review/Review";
import CheckReview from "../pages/Dashboard/CheckReview/CheckReview";
import Report from "../pages/Dashboard/Report/Report";
import Charity from "../pages/Dashboard/Report/Charity";
import Waiter from "../pages/ChefHome/Waiter";
import DeliverFood from "../pages/DeliverFood/DeliverFood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // normal user routes
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },

      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "payment/success/:tran_id",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "review",
        element: <Review>,</Review>,
      },

      //admin routes

      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },

      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },

      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },

      {
        path: "checkReview",
        element: (
          <AdminRoute>
            <CheckReview></CheckReview>
          </AdminRoute>
        ),
      },
      {
        path: "report",
        element: (
          <AdminRoute>
            <Report></Report>
          </AdminRoute>
        ),
      },
      {
        path: "charity",
        element: (
          <AdminRoute>
            <Charity></Charity>
          </AdminRoute>
        ),
      },
      {
        path: "deliverFood",
        element: (
          <AdminRoute>
            <DeliverFood></DeliverFood>,
          </AdminRoute>
        ),
      },

      //chef users

      {
        path: "/dashboard/chef-home",
        element: (
          <ChefRoute>
            <ChefHome></ChefHome>
          </ChefRoute>
        ),
      },
      {
        path: "/dashboard/waiter",
        element: (
          <ChefRoute>
            <Waiter></Waiter>,
          </ChefRoute>
        ),
      },
    ],
  },
]);
