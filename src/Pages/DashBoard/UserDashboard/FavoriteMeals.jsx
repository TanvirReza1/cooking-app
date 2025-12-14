import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const FavoriteMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch favorites for the logged-in user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  // Delete favorite meal
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      Swal.fire(
        "Deleted!",
        "Meal removed from favorites successfully",
        "success"
      );
      queryClient.invalidateQueries(["favorites", user?.email]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading favorites...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Favorite Meals</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          No favorite meals added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((fav) => (
                <tr key={fav._id}>
                  <td className="font-semibold">{fav.mealName}</td>
                  <td>{fav.chefName}</td>
                  <td>${fav.price || "N/A"}</td>
                  <td>{new Date(fav.addedTime).toLocaleDateString()}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
