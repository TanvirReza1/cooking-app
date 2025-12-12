import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ========= FETCH ORDERS FOR THIS CHEF ==========
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/chef/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ========= MUTATION FOR PATCHING ORDER STATUS =========
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/orders/${id}`, { orderStatus: status });
    },
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
  });

  // ========= HANDLERS =========
  const handleStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Requests</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found for you yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const disabledCancel = order.orderStatus !== "pending";
          const disabledAccept = order.orderStatus !== "pending";
          const disabledDeliver = order.orderStatus !== "accepted";

          return (
            <div
              key={order._id}
              className="card bg-base-200 shadow-xl p-5 border rounded-xl"
            >
              <h2 className="text-2xl font-semibold mb-2">{order.mealName}</h2>

              <p>
                <strong>Price:</strong> ${order.price}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>User Email:</strong> {order.userEmail}
              </p>
              <p>
                <strong>User Address:</strong> {order.userAddress}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Order Time:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-error btn-sm"
                  disabled={disabledCancel}
                  onClick={() => handleStatus(order._id, "cancelled")}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-info btn-sm"
                  disabled={disabledAccept}
                  onClick={() => handleStatus(order._id, "accepted")}
                >
                  Accept
                </button>

                <button
                  className="btn btn-success btn-sm"
                  disabled={disabledDeliver}
                  onClick={() => handleStatus(order._id, "delivered")}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequests;
