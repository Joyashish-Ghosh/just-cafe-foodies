import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = (food) => {
    console.log(food);
    if (user && user.email) {
      //  send cart item to database
      // console.log(user.email, food);

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res);
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          //   refetch cart to update cartitems
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Login",
        text: "Login first for add to cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          //send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="food" />
      </figure>
      <p className=" absolute right-0 mr-2 px-3 bg-gray-400 text-blue-800 font-bold rounded-md">
        BDT {price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-gray-400 text-blue-950 font-bold rounded-md mt-4 "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
