import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { registerUser} from "../redux/slice1"


import Login from "./login";

function Signup() {

  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z
    .string()
    .regex(/^\+?\d{10,14}$/, "Invalid phone number"), // allows optional + and 10-14 digits
  address: z.string().min(1, "Address is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    ),
});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    const userData = dispatch(registerUser(data));
    
  };

  // const handleGoogleSignup = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     // You may also send this to your backend or store it in Redux
  //     const data = {
  //       firstName: user.displayName || "Google User",
  //       emailId: user.email,
  //       password: "google-oauth", // dummy password if your backend requires it
  //       isGoogle: true, // custom flag
  //     };

  //     dispatch(registerUser(data));
  //   } catch (error) {
  //     console.error("Google sign-in error:", error);
  //   }
  // };

 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card flex-shrink-0 w-125 max-w-sm shadow-2xl bg-base-100 m-auto "
    >
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className="input input-bordered"
          />
          {errors.firstName && (
            <span className="text-error label-text-alt">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="Enter phone"
            className="input input-bordered"
          />
          {errors.phone && (
            <span className="text-error label-text-alt">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            {...register("address")}
            placeholder="Enter address"
            className="input input-bordered"
          />
          {errors.address && (
            <span className="text-error label-text-alt">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="input input-bordered"
          />
          {errors.password && (
            <span className="text-error label-text-alt">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="form-control mt-6 text-left">
  <button 
    type="submit" 
    className="btn btn-primary w-25 md:w-auto"
  >
    Sign Up
  </button>
  <p className="mt-4 text-sm text-gray-600 text-right  ">
    Already have an account?{' '}
    <NavLink to="/login" className="text-primary font-medium hover:underline">
      Sign In
    </NavLink>
  </p>
</div>


        

        {/* <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="btn btn-outline btn-accent"
        >
          Continue with Google
        </button> */}

        <div>
          <p>{isAuthenticated?.message ? isAuthenticated.message : ""}</p>
        </div>
      </div>
    </form>
  );
}


  
  


export default Signup;