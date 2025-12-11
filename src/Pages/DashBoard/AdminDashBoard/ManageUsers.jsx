import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // FETCH ALL USERS
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // MUTATION: MAKE USER FRAUD
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/fraud/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "User marked as fraud successfully.",
        icon: "success",
        timer: 1500,
      });
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table w-full shadow rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>
                <td>{user.name || "No Name"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      user.status === "fraud" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="text-center">
                  {/* Hide button if role is admin */}
                  {user.role === "admin" ? (
                    <span className="text-gray-500">Admin</span>
                  ) : user.status === "fraud" ? (
                    <button disabled className="btn btn-sm btn-disabled">
                      Fraud
                    </button>
                  ) : (
                    <button
                      onClick={() => mutation.mutate(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      Make Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
