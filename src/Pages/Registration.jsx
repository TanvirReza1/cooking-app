import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { imageUpload } from "../utils";
import useAuth from "../hooks/useAuth";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    const { email, password, confirmPassword, name, address } = data;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // 1️⃣ Create Firebase Account
      await createUser(email, password);

      // 2️⃣ Upload Image to IMGBB
      const imageFile = data.image[0];
      const uploadedImageUrl = await imageUpload(imageFile);

      // 3️⃣ Update Firebase Profile
      await updateUserProfile(name, uploadedImageUrl);

      // 4️⃣ Save User in Database
      await axiosSecure.post("/users", {
        name,
        email,
        image: uploadedImageUrl,
        address,
        role: "user",
        status: "active",
      });

      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit(handleRegistration)}>
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

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          {/* Profile Image */}
          <label className="label">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="input input-bordered w-full"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}

          {/* Address */}
          <label className="label">Address</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Address"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">Address is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">Confirm password is required</p>
          )}

          <button className="btn btn-neutral w-full mt-4">Register</button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-blue-500 underline"
              to="/logIn"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
