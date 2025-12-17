import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../../utils";
import { useNavigate } from "react-router";

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // FORM SUBMIT HANDLER
  const onSubmit = async (data) => {
    try {
      // 1️⃣ Get file from input
      const imageFile = data.foodImage[0];
      // 2️⃣ Upload to imgbb
      const imageUrl = await imageUpload(imageFile);

      const meal = {
        foodName: data.foodName,
        chefName: userData?.name || user?.displayName,

        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        deliveryArea: data.deliveryArea,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: userData?.chefId,
        chefEmail: user?.email,
        createdAt: new Date(),
      };

      // Send to DB
      const res = await axiosSecure.post("/meals", meal);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Meal Added Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        reset();

        // Redirect to My Meals page
        navigate("/dashboard/my-meals");
      }
    } catch (error) {
      // 🛑 Fraud chef case (DO NOT LOGOUT)
      if (error?.response?.data?.errorType === "FRAUD_USER") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text:
            error.response.data.message ||
            "You are marked as fraud. You cannot create meals.",
        });
        return;
      }

      // ❌ Other errors
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    }
  };

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg bg-white rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-5">Create Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        {/* Food Name */}
        <div>
          <label>Food Name</label>
          <input
            type="text"
            {...register("foodName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.foodName && <p className="text-red-500">Required</p>}
        </div>

        {/* Chef Name (Auto) */}
        <div>
          <label>Chef Name</label>
          <input
            type="text"
            value={userData?.name || user?.displayName || "Chef"}
            readOnly
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Food Image Upload */}
        <div>
          <label>Food Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("foodImage", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.foodImage && (
            <p className="text-red-500">Image is required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            inputMode="decimal"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.price && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label>Ingredients (comma separated)</label>
          <textarea
            {...register("ingredients", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="e.g. Chicken, Lettuce, Olive oil"
          ></textarea>

          {errors.ingredients && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Delivery Area */}
        <div>
          <label>Delivery Area</label>
          <input
            type="text"
            {...register("deliveryArea", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Dhanmondi, Mirpur, Uttara"
          />
          {errors.deliveryArea && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <label>Estimated Delivery Time</label>
          <input
            type="text"
            {...register("estimatedDeliveryTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="30 minutes"
          />
          {errors.estimatedDeliveryTime && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Chef Experience */}
        <div>
          <label>Chef Experience</label>
          <textarea
            {...register("chefExperience", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="5 years of experience..."
          ></textarea>
          {errors.chefExperience && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Chef ID */}
        <div>
          <label>Chef ID</label>
          <input
            type="text"
            value={userData?.chefId}
            readOnly
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* User Email */}
        <div>
          <label>Your Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        <button className="btn btn-primary mt-4">Add Meal</button>
      </form>
    </div>
  );
};

export default CreateMeal;
