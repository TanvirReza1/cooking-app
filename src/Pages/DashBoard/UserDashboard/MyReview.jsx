import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedReview, setSelectedReview] = useState(null);

  // GET logged-in user's reviews
  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-reviews?email=${user?.email}`);
      return res.data;
    },
  });

  // DELETE review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your review has been removed.", "success");
      queryClient.invalidateQueries(["myReviews"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // UPDATE review
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return axiosSecure.patch(`/reviews/${data.id}`, {
        rating: data.rating,
        comment: data.comment,
      });
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Your review has been updated.", "success");
      queryClient.invalidateQueries(["myReviews"]);
      setSelectedReview(null);
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    updateMutation.mutate({
      id: selectedReview._id,
      rating,
      comment,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">My Reviews</h1>

      {myReviews.length === 0 && (
        <p className="text-gray-500">You have not submitted any reviews yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myReviews.map((review) => (
          <div key={review._id} className="card border p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-1">{review.mealName}</h2>
            <p className="text-yellow-500 font-bold">⭐ {review.rating}</p>
            <p className="mt-2">{review.comment}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(review.date).toLocaleDateString()}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSelectedReview(review)}
                className="btn btn-sm btn-info"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {selectedReview && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Update Review</h3>

            <form onSubmit={handleUpdate} className="mt-4 space-y-3">
              <input
                name="rating"
                defaultValue={selectedReview.rating}
                type="number"
                min="1"
                max="5"
                className="input input-bordered w-full"
              />

              <textarea
                name="comment"
                defaultValue={selectedReview.comment}
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReview;
