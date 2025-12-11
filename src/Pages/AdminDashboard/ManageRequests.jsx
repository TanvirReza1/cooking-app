import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // FETCH ALL ROLE REQUESTS
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // ACCEPT REQUEST
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/role-requests/accept/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Approved!",
        text: "The user's role has been updated.",
        timer: 1500,
      });
      queryClient.invalidateQueries(["roleRequests"]);
    },
  });

  // REJECT REQUEST
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/role-requests/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "error",
        title: "Request Rejected",
        timer: 1500,
      });
      queryClient.invalidateQueries(["roleRequests"]);
    },
  });

  if (isLoading)
    return <p className="text-center text-lg py-10">Loading Requests...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Role Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full shadow rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id} className="hover">
                <td>{index + 1}</td>
                <td>{req.name || "Unknown"}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.requestStatus === "approved"
                        ? "bg-green-600"
                        : req.requestStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td>{new Date(req.requestTime).toLocaleString()}</td>

                <td className="flex gap-2 justify-center">
                  {/* If approved or rejected → disable buttons */}
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => acceptMutation.mutate(req._id)}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>

                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => rejectMutation.mutate(req._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
