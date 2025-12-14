import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingMeal, setEditingMeal] = useState(null);

  // ===== GET meals created by chef =====
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ====== DELETE MEAL ======
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/meals/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Meal deleted successfully.", "success");
      queryClient.invalidateQueries(["meals"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  // ====== UPDATE MEAL ======
  const updateMutation = useMutation({
    mutationFn: async ({ id, updated }) =>
      axiosSecure.patch(`/meals/${id}`, updated),
    onSuccess: () => {
      Swal.fire("Updated!", "Meal updated successfully.", "success");
      setEditingMeal(null);
      queryClient.invalidateQueries(["meals"]);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageFile = form.image.files[0];

    let imageUrl = editingMeal.foodImage;

    // ✅ Upload new image ONLY if selected
    if (imageFile) {
      try {
        imageUrl = await imageUpload(imageFile);
      } catch (err) {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }
    }

    const updated = {
      foodName: form.foodName.value,
      foodImage: imageUrl,
      price: parseFloat(form.price.value),
      ingredients: form.ingredients.value.split(","),
      estimatedDeliveryTime: form.estimatedDeliveryTime.value,
      chefName: editingMeal.chefName,
    };

    updateMutation.mutate({ id: editingMeal._id, updated });
  };

  if (isLoading) return <p className="p-6">Loading meals...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Meals</h1>

      {meals.length === 0 && <p>No meals found. Create one!</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-200 p-4 shadow-md">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="rounded-lg h-48 w-full object-cover"
            />

            <h2 className="text-xl font-bold mt-3">{meal.foodName}</h2>

            <p>
              <strong>Price:</strong> ${meal.price}
            </p>
            <p>
              <strong>Rating:</strong> {meal.rating}
            </p>
            <p>
              <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
            </p>
            <p>
              <strong>Est. Time:</strong> {meal.estimatedDeliveryTime}
            </p>
            <p>
              <strong>Chef Name:</strong> {meal.chefName}
            </p>
            <p>
              <strong>Chef ID:</strong> {meal.chefId}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(meal._id)}
              >
                Delete
              </button>

              <button
                className="btn btn-info btn-sm"
                onClick={() => setEditingMeal(meal)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========= UPDATE MODAL ========= */}
      {editingMeal && (
        <dialog className="modal modal-open">
          <form className="modal-box" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-4">Update Meal</h3>

            <input
              name="foodName"
              defaultValue={editingMeal.foodName}
              className="input input-bordered w-full mb-2"
            />

            <img
              src={editingMeal.foodImage}
              alt="Current Meal"
              className="w-full h-40 object-cover rounded mb-2"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full mb-2"
            />

            <input
              type="number"
              name="price"
              defaultValue={editingMeal.price}
              className="input input-bordered w-full mb-2"
            />

            <textarea
              name="ingredients"
              defaultValue={editingMeal.ingredients.join(", ")}
              className="textarea textarea-bordered w-full mb-2"
            />

            <input
              name="estimatedDeliveryTime"
              defaultValue={editingMeal.estimatedDeliveryTime}
              className="input input-bordered w-full mb-2"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn"
                onClick={() => setEditingMeal(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyMeals;
