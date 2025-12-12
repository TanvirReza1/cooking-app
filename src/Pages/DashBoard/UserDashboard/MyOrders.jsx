import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async (order) => {
    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        price: order.price,
        orderId: order._id,
      });

      window.location.assign(res.data.paymentUrl);
      // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <p>
                <strong>Meal:</strong> {order.mealName}
              </p>
              <p>
                <strong>Price:</strong> {order.price} ৳
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Chef ID:</strong> {order.chefId}
              </p>

              <p>
                <strong>Order Time:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* Pay Button */}
              {order.orderStatus === "accepted" &&
                order.paymentStatus === "pending" && (
                  <button
                    onClick={() => handlePayment(order)}
                    className="btn btn-primary mt-4"
                  >
                    Pay Now
                  </button>
                )}

              {/* After Payment */}
              {order.paymentStatus === "paid" && (
                <Link
                  to={`/payment-success/${order._id}`}
                  className="btn btn-success mt-4"
                >
                  View Payment Receipt
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
