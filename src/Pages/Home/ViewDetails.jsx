import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosSecure
      .get(`/meals/${id}`)
      .then((res) => {
        setMeal(res.data);
        setErr(null);
      })
      .catch((error) => {
        console.error("Failed to fetch meal", error);
        setErr("Could not load meal details.");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (err) return <div className="p-8 text-red-600">{err}</div>;
  if (!meal) return <div className="p-8">Meal not found</div>;

  const handleOrderNow = () => {
    if (!user || !user.email) {
      navigate("/logIn", { state: { from: `/view-details/${id}` } });
      return;
    }
    // go to order page (create route /order/:id or whatever you use)
    navigate(`/order/${id}`);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-80 object-cover"
        />

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
              <p className="mt-2">
                Delivery Area: {meal.deliveryArea || "Not Provided"}
              </p>
              <p className="mt-2">
                Estimated Delivery Time: {meal.estimatedDeliveryTime || "N/A"}
              </p>
            </div>

            <div>
              <p className="font-semibold">Ingredients</p>
              <ul className="list-disc ml-5 mt-2">
                {(meal.ingredients || []).length > 0 ? (
                  meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)
                ) : (
                  <li>Not provided</li>
                )}
              </ul>

              <p className="mt-4">
                Chef's Experience: {meal.chefExperience || "Not Provided"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleOrderNow}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Order Now
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-lg border"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
