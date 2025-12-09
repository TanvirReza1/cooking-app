import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const CreateMeal = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure(); // <-- CALL the hook

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // FORM SUBMIT
  const onSubmit = async (data) => {
    try {
      // 1️⃣ upload image first
      const imageUrl = await imageUpload(data.foodImage[0]);

      // 2️⃣ Prepare meal object
      const meal = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: data.chefId,
        userEmail: user?.email,
        createdAt: new Date(),
      };

      // 3️⃣ send meal to DB
      const res = await axiosSecure.post("/meals", meal);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Meal Added Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        reset();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
      });
    }
  };

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

        {/* Chef Name */}
        <div>
          <label>Chef Name</label>
          <input
            type="text"
            {...register("chefName", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Food Image */}
        <div>
          <label>Food Image (Upload)</label>
          <input
            type="file"
            accept="image/*"
            {...register("foodImage", { required: true })}
            className="file-input w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label>Ingredients (comma separated)</label>
          <textarea
            {...register("ingredients", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="e.g. Chicken, Lettuce, Olive oil"
          ></textarea>
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
        </div>

        {/* Chef Experience */}
        <div>
          <label>Chef Experience</label>
          <textarea
            {...register("chefExperience", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="5 years of experience..."
          ></textarea>
        </div>

        {/* Chef ID */}
        <div>
          <label>Chef ID</label>
          <input
            type="text"
            {...register("chefId", { required: true })}
            className="input input-bordered w-full"
            placeholder="chef_123456"
          />
        </div>

        {/* User Email (read only) */}
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
