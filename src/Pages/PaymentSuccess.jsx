import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch order details
  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  // Fetch payment info
  const { data: payment = {}, isLoading: paymentLoading } = useQuery({
    queryKey: ["paymentDetails", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${orderId}`);
      return res.data;
    },
  });

  if (isLoading || paymentLoading)
    return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you! Your payment has been processed successfully.
      </p>

      <div className="border p-4 rounded-lg shadow bg-white text-left">
        <h2 className="text-xl font-semibold mb-2 border-b pb-2">Receipt</h2>

        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Meal Name:</strong> {order.mealName}
        </p>
        <p>
          <strong>Price Paid:</strong> {order.price} ৳
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Chef ID:</strong> {order.chefId}
        </p>
        <p>
          <strong>Payment Time:</strong>{" "}
          {new Date(payment.time).toLocaleString()}
        </p>

        <p className="mt-4 text-green-600 font-semibold">
          Payment Status: PAID
        </p>
      </div>

      <Link to="/dashboard/my-orders">
        <button className="btn btn-primary mt-6">Back to My Orders</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
