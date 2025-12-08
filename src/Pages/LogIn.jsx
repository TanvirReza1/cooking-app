import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

const LogIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password); // Firebase login
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <button className="btn btn-neutral w-full mt-4">Login</button>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link
              state={location.state}
              className="text-blue-500 underline"
              to="/registration"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
