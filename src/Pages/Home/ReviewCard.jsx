import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerEmail, rating, comment, date } = review;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <span className="text-purple-600 text-3xl font-bold">“</span>

      <p className="mt-4 text-gray-700 min-h-[80px]">{comment}</p>

      <hr className="my-4" />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-600"></div>

        <div>
          <h4 className="font-bold text-gray-900">
            {reviewerName || "Anonymous"}
          </h4>

          <p className="text-sm text-gray-500">
            {rating ? `${rating} ★` : "No rating"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
