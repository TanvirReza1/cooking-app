import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const LogIn = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setValue("email", "demo@gmail.com");
    setValue("password", "123456");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const loggedUser = result.user;

      // 🔥 FORCE Firebase to issue token immediately
      await loggedUser.getIdToken(true);

      await axiosSecure.post("/users", {
        name: loggedUser.displayName,
        email: loggedUser.email,
        image: loggedUser.photoURL,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
      <div className="w-full max-w-md rounded-2xl bg-base-100/80 backdrop-blur shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-sm text-gray-500 mt-2">
          Login to continue to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 border rounded-xl py-3 hover:bg-base-200 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="divider my-6 text-sm">OR LOGIN WITH EMAIL</div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="label text-sm font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button
            disabled={loading}
            className="btn btn-primary w-full rounded-xl mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo */}
        <button
          onClick={handleDemoLogin}
          className="btn btn-ghost w-full mt-3 text-sm"
        >
          Use Demo Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/registration"
            className="text-primary font-medium underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
