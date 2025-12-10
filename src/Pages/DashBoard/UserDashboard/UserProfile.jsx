import {} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch full user data from DB
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const requestMutation = useMutation({
    mutationFn: async (reqBody) => axiosSecure.post("/role-requests", reqBody),

    onSuccess: () => {
      Swal.fire("Request Sent", "Your role request was submitted!", "success");
      queryClient.invalidateQueries(["userData"]);
    },

    onError: (error) => {
      if (error.response?.status === 409) {
        Swal.fire(
          "Already Requested",
          "You already submitted this request. Please wait for admin approval.",
          "warning"
        );
      } else {
        Swal.fire("Error", "Something went wrong. Try again later.", "error");
      }
    },
  });

  const handleRequest = (type) => {
    const reqData = {
      userName: userData.name,
      userEmail: userData.email,
      requestType: type, // chef / admin
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    requestMutation.mutate(reqData);
  };

  if (isLoading || !userData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-6 text-center">
        <img
          src={userData.image}
          alt="User"
          className="w-28 h-28 rounded-full mx-auto object-cover border"
        />

        <h2 className="text-2xl font-bold mt-4">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>

        <div className="text-left mt-6 space-y-2">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {userData.address || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {userData.role}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {userData.status}
          </p>

          {userData.role === "chef" && (
            <p>
              <span className="font-semibold">Chef ID:</span> {userData.chefId}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          {/* Show “Be a Chef” only if not chef/admin */}
          {userData.role === "user" && (
            <button
              onClick={() => handleRequest("chef")}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Be a Chef
            </button>
          )}

          {/* Show “Be an Admin” only if not admin */}
          {userData.role !== "admin" && (
            <button
              onClick={() => handleRequest("admin")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
