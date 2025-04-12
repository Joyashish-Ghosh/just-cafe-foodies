import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate()

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);



                // updateUserProfile(data.name, data.photoURL)
                //     .then(() => {
                //         console.log("profile updated")
                        
                //     })
                    reset();
                    navigate('/');

                // aktu problem ase .then er line,ar akta .then besi  use kora ase
                
                // create userentry in the database
                const userInfo = {
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')


                        }
                    })


            })
            .catch(error => console.log(error));

    };

    return (
        <>
            <Helmet>
                <title>Just Cafe | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p  className="mt-2 py-6  border-gray-500  text-blue-800 p-4 text-left">
  Welcome to Just Cafe Foodies! We're excited to have you with us. Explore our menu to discover a variety of delicious dishes and beverages. Whether you're here for a quick snack or a full meal, we have something for everyone. Enjoy your journey with us, and don't forget to add your favorite items to your cart!
</p>

                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600" >The name is empty</span>}

                            </div>

                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                    imgBB theke banano photo URL link: https://ibb.co.com/PjMq2Bw
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600" >Photo URl is require</span>}

                            </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600" >The email is empty</span>}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 4,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[0-9]).*$/

                                })}
                                    placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">password must be 4 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">password must have one upper case,one lower case and one digit </p>}
                                <label className="label">

                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="px-6" ><small>Already have an account?<Link to="/login">  Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;