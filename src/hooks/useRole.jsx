// src/hooks/useRole.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile-role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  return { role: profile?.role, isLoading };
};

export default useRole;
