import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);
  useEffect(() => {
    loadCaptchaEnginge(3);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
        },
        hideClass: {
          popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Just Cafe | Login </title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center  md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="mt-2 py-4  border-gray-500  text-blue-800 p-4 text-left">
              Welcome to Just Cafe Foodies! We're excited to have you with us.
              Explore our menu to discover a variety of delicious dishes and
              beverages. Whether you're here for a quick snack or a full meal,
              we have something for everyone. Enjoy your journey with us, and
              don't forget to add your favorite items to your cart!
            </p>
          </div>
          <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha"
                  className="input input-bordered"
                  required
                />
                {/* <button  className="btn btn-outline btn-xs mt-2">Validate</button> */}
              </div>
              <div className="form-control mt-6">
                {/* TODO:apply disable for re captcha */}
                <input
                  disabled={false}
                  className="btn btn-primary"
                  type="submit"
                  value="login"
                />
              </div>
            </form>
            <p className="px-6">
              <small>
                New Here??<Link to="/signup">Create an account.</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
