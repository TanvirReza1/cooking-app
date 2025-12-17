import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const OrderPage = () => {
  const { id: paramId } = useParams();
  const { state } = useLocation();
  const fromStateMeal = state?.meal;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  // If meal passed through navigation state use that, otherwise fetch by param
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", paramId],
    enabled: !fromStateMeal, // skip fetch if meal already provided
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${paramId}`);
      return res.data;
    },
  });

  // finalMeal = state meal if provided else fetched meal
  const finalMeal = fromStateMeal || meal;

  // guard UI when still loading / missing meal
  if (fromStateMeal == null && isLoading) {
    return <div className="p-8">Loading meal...</div>;
  }
  if (!finalMeal) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-3">Failed to load meal.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleOrder = () => {
    // make sure quantity is at least 1
    const safeQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
    const totalPrice = finalMeal.price * safeQuantity;

    Swal.fire({
      title: `Your total price is $${totalPrice}`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderData = {
          foodId: finalMeal._id,
          mealName: finalMeal.foodName || finalMeal.mealName || "Meal",
          price: finalMeal.price,
          quantity: safeQuantity,
          chefId: finalMeal.chefId,
          chefEmail: finalMeal.chefEmail,
          chefName: finalMeal.chefName,
          paymentStatus: "Pending",
          userEmail: user?.email || "",
          userAddress,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
        };

        axiosSecure
          .post("/orders", orderData)
          .then(() => {
            Swal.fire("Order placed successfully!", "", "success");
            navigate("/dashboard/my-orders");
          })
          .catch(() => {
            Swal.fire(
              "Error",
              "There was a problem placing your order. Try again.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <div className="space-y-3">
        <div>
          <label className="block mb-1">Meal Name</label>
          <input
            type="text"
            value={finalMeal.foodName || finalMeal.mealName || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={finalMeal.price}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Your Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">Delivery Address</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter your address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            required
          />
        </div>

        <button onClick={handleOrder} className="btn btn-primary w-full">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
