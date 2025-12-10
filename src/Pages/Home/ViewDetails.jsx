import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reviewModal, setReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // -------------------------
  // FETCH MEAL DETAILS
  // -------------------------
  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  // -------------------------
  // FETCH REVIEWS
  // -------------------------
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // -------------------------
  // ADD REVIEW MUTATION
  // -------------------------
  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => axiosSecure.post("/reviews", reviewData),
    onSuccess: () => {
      Swal.fire("Success!", "Review submitted successfully!", "success");
      queryClient.invalidateQueries(["reviews", id]);
      setReviewModal(false);
      setReviewText("");
      setRating(5);
    },
  });

  // -------------------------
  // ADD FAVORITE MUTATION
  // -------------------------
  const favoriteMutation = useMutation({
    mutationFn: async (favData) => axiosSecure.post("/favorites", favData),
    onSuccess: (res) => {
      if (res.data.exists) {
        Swal.fire("Already Added", "This meal is already in favorites", "info");
      } else {
        Swal.fire("Added!", "Meal added to favorites!", "success");
      }
    },
  });

  const handleAddFavorite = () => {
    if (!user) {
      navigate("/logIn", { state: { from: `/meal/${id}` } });
      return;
    }

    favoriteMutation.mutate({
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date(),
    });
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) return;

    reviewMutation.mutate({
      foodId: id,
      foodName: meal.foodName,
      reviewerName: user.displayName || "Anonymous User",
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      rating,
      comment: reviewText,
      date: new Date(),
    });
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error)
    return <div className="p-8 text-red-600">Failed to load meal.</div>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* ---------------- MEAL CARD ---------------- */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img src={meal.foodImage} className="w-full h-80 object-cover" />

        <div className="p-6">
          <h1 className="text-3xl font-bold">{meal.foodName}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Chef: {meal.chefName} (ID: {meal.chefId})
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold">
                Price: <span className="text-purple-700">${meal.price}</span>
              </p>
              <p className="mt-2">⭐ Rating: {meal.rating}/5</p>
              <p className="mt-2">Delivery Area: {meal.deliveryArea}</p>
              <p className="mt-2">
                Estimated Delivery: {meal.estimatedDeliveryTime}
              </p>
            </div>

            <div>
              <p className="font-semibold">Ingredients</p>
              <ul className="list-disc ml-5 mt-2">
                {meal.ingredients?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              <p className="mt-4">
                Chef Experience: {meal.chefExperience || "Not Provided"}
              </p>
            </div>
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="mt-6 flex gap-3">
            <Link
              to={`/orderpage/${id}`}
              className="bg-green-600 text-white px-5 py-2 rounded-lg inline-block"
            >
              Order Now
            </Link>

            <button
              onClick={handleAddFavorite}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
            >
              Add to Favorite
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 border rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- REVIEWS SECTION ---------------- */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {/* GIVE REVIEW BUTTON */}
        <button
          onClick={() => setReviewModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
        >
          Give Review
        </button>

        {/* SHOW EXISTING REVIEWS */}
        <div className="space-y-4">
          {reviews.length === 0 && <p>No reviews yet.</p>}

          {reviews.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg shadow">
              <div className="flex items-center gap-3">
                <img
                  src={r.reviewerImage}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{r.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{r.reviewerEmail}</p>
                  <p className="text-yellow-600">⭐ {r.rating}</p>
                </div>
              </div>
              <p className="mt-3">{r.comment}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(r.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- REVIEW MODAL ---------------- */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>

            <label>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 w-full rounded mb-3"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>

            <textarea
              className="border p-3 w-full rounded"
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewDetails;
