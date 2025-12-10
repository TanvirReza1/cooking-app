import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { reviewerImage, reviewerName, reviewerEmail, rating, comment, date } =
    review;

  const formattedDate = date
    ? new Date(date).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      {/* Quote Icon */}
      <span className="text-purple-600 text-3xl font-bold">“</span>

      {/* Review Comment */}
      <p className="mt-4 text-gray-700 min-h-[80px]">{comment}</p>

      <hr className="my-4" />

      <div className="flex items-center gap-4">
        {/* Reviewer Image */}
        {reviewerImage ? (
          <img
            src={reviewerImage}
            alt={reviewerName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-teal-600"></div>
        )}

        <div>
          {/* Food Name */}
          <p className="text-sm font-semibold text-green-700">
            {review.foodName}
          </p>
          {/* Name */}
          <h4 className="font-bold text-gray-900">
            {reviewerName || "Anonymous"}
          </h4>

          {/* Email */}
          <p className="text-sm text-gray-500">{reviewerEmail || "No email"}</p>

          {/* Rating */}
          <p className="text-sm text-yellow-600 font-semibold">
            {rating ? `${rating} ★` : "No rating"}
          </p>

          {/* Date */}
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
