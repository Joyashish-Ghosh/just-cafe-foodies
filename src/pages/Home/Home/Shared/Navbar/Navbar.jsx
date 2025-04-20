import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../../../hooks/useCart";
import useAdmin from "../../../../../hooks/useAdmin";
import useChef from "../../../../../hooks/useChef";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isChef] = useChef();
  const [cart] = useCart();

  // Check if the user is neither an admin nor chef
  const isUser = isAdmin === false && isChef === false;

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }

  const navOptions = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/menu">Our Menu</Link></li>
    <li><Link to="/order/salad">Order Food</Link></li>
    {/* <li><Link to="/secret">Secret</Link></li> */}

    {
      user && isAdmin && <li><Link to = "/dashboard/adminHome">Dashboard 
      </Link></li>
    }
    {
      user && !isAdmin && !isChef && <li><Link to = "/dashboard/userHome">Dashboard 
      </Link></li>
    }
   {
      user && isChef && <li><Link to = "/dashboard/chef-home">Dashboard 
      </Link></li>
    }

{/* Show the cart only for non-admin and non-chef */}
{isUser && (
    <li>
      <Link to="/dashboard/cart">
        <button className="btn min-h-0 h-8">
          <FaShoppingCart className="mr-2"></FaShoppingCart>
          <div className="badge badge-secondary">+{cart.length}</div>
        </button>
      </Link>
     </li>
   )}


    {
      user ? <>
      {/* photo add korar logic */}
      {/* <span>{user?.displayName}</span> */}
        <div onClick={handleLogOut} className="btn btn-sm pt-[4px] btn-ghost">LogOut</div>
      </> : <>
        <li><Link to="/login">Login</Link></li>

      </>
    }
  </>
  return (
    <div>
      <div className="navbar fixed z-10 max-w-screen-xl bg--4 bg-gray-600 text-white rounded-lg h-0 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Just Cafe Foodies</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn hover bg-gray-400"><Link to="/menu">Get Started</Link></a>

        </div>
      </div>
    </div>
  );
};

export default Navbar;