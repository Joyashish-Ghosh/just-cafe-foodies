import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import PaymentHistory from "./../pages/Dashboard/PaymentHistory/PaymentHistory";
import useChef from "../hooks/useChef";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isChef] = useChef();
  // const [isAdmin, isAdminLoading] = useAdmin();
  // const [isChef, isChefLoading] = useChef();

   // Wait until both role checks are done
  //  if (isAdminLoading || isChefLoading) {
  //   return <div className="text-center text-xl mt-20 text-blue-700">Loading Dashboard...</div>;
  // }

  // const isUser = !isAdmin && !isChef;

  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen bg-gray-700 rounded-lg text-2xl text-white font-bold">
        <ul className="menu p-4">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/AdminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/Users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/checkReview">
                  <FaBook></FaBook>
                  Check Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/report">
                  <FaBook></FaBook>
                  Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/charity">
                  <FaBook></FaBook>
                  Charity
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/deliverFood">
                  <FaBook></FaBook>
                  Delivery Food
                </NavLink>
              </li>
            </>
          )}

          {/* users er jonno */}
          {!isChef && !isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li> 

             

               <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart({cart.length})
                </NavLink>
              </li> 

               <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd>
                  Add Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList>
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          
          


          {isChef && (
            <>
              <li>
                <NavLink to="/dashboard/chef-home">
                  <FaHome></FaHome>
                  Chef Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/waiter">
                  <FaHome></FaHome>
                  Waiter
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
