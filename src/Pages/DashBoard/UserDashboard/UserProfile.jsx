import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    image: "",
  });

  // ================= FETCH USER =================
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // ================= SYNC FORM =================
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        address: userData.address || "",
        image: userData.image || "",
      });
    }
  }, [userData]);

  // ================= UPDATE PROFILE =================
  const updateMutation = useMutation({
    mutationFn: (updatedInfo) =>
      axiosSecure.patch(`/users/${user.email}`, updatedInfo),

    onSuccess: () => {
      Swal.fire("Updated!", "Profile updated successfully", "success");
      setIsEditing(false);
      queryClient.invalidateQueries(["userData", user?.email]);
    },

    onError: () => {
      Swal.fire("Error", "Failed to update profile", "error");
    },
  });

  // ================= ROLE REQUEST =================
  const requestMutation = useMutation({
    mutationFn: (reqBody) => axiosSecure.post("/role-requests", reqBody),

    onSuccess: () => {
      Swal.fire("Request Sent", "Your role request was submitted!", "success");
      queryClient.invalidateQueries(["userData", user?.email]);
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
    requestMutation.mutate({
      userName: userData.name,
      userEmail: userData.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    });
  };

  // ================= LOADING =================
  if (isLoading || !userData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className=" shadow-md rounded-xl p-6 text-center">
        <img
          src={isEditing ? formData.image : userData.image}
          alt="User"
          className="w-28 h-28 rounded-full mx-auto object-cover border"
        />

        {!isEditing ? (
          <>
            <h2 className="text-2xl  font-bold mt-4">{userData.name}</h2>
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
                  <span className="font-semibold">Chef ID:</span>{" "}
                  {userData.chefId}
                </p>
              )}
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full border p-2 rounded"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Address"
            />

            <input
              className="w-full border p-2 rounded"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="Image URL"
            />

            <button
              disabled={updateMutation.isLoading}
              onClick={() => updateMutation.mutate(formData)}
              className="w-full bg-green-600  py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-400 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}

        {/* ================= ROLE REQUEST BUTTONS ================= */}
        <div className="mt-6 space-y-3">
          {userData.role === "user" && (
            <button
              disabled={requestMutation.isLoading}
              onClick={() => handleRequest("chef")}
              className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              Be a Chef
            </button>
          )}

          {userData.role !== "admin" && (
            <button
              disabled={requestMutation.isLoading}
              onClick={() => handleRequest("admin")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
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
