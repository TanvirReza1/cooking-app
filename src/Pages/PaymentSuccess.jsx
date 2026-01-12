import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const sessionId = new URLSearchParams(location.search).get("session_id");

  // 🔥 SEND payment success to backend (insert payment + mark paid)
  const paymentMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/payment-success", {
        orderId,
        paymentInfo: { sessionId },
      });
    },
  });

  // 🔥 Automatically call backend after redirect
  useEffect(() => {
    if (sessionId) {
      paymentMutation.mutate();
    }
  }, [sessionId, orderId]);

  // FETCH ORDER DETAILS
  const {
    data: order = {},
    isLoading: orderLoading,
    error: orderError,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  // FETCH PAYMENT DETAILS
  const {
    data: payment = {},
    isLoading: paymentLoading,
    error: paymentError,
  } = useQuery({
    queryKey: ["paymentDetails", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${orderId}`);
      return res.data;
    },
    enabled: !!sessionId, // wait until payment is inserted
  });

  // LOADING UI
  if (orderLoading || paymentLoading || paymentMutation.isPending) {
    return <div className="text-center mt-10">Processing payment...</div>;
  }

  // ERROR UI
  if (orderError || paymentError || paymentMutation.isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Something went wrong... Unable to load receipt.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you! Your payment has been processed successfully.
      </p>

      {/* RECEIPT CARD */}
      <div className="border p-4 rounded-lg shadow  text-left">
        <h2 className="text-xl font-semibold mb-2 border-b pb-2">Receipt</h2>

        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Meal Name:</strong> {order.mealName || "N/A"}
        </p>
        <p>
          <strong>Price Paid:</strong> {order.price} ৳
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Chef ID:</strong> {order.chefId || "N/A"}
        </p>

        <p>
          <strong>Payment Time:</strong>{" "}
          {payment?.time ? new Date(payment.time).toLocaleString() : "N/A"}
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
