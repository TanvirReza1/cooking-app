import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
          // Get REAL Firebase ID token
          const token = await currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        const errorType = error?.response?.data?.errorType;

        // ✅ Logout ONLY if token is invalid / expired
        if (status === 401) {
          await logOut();
          navigate("/");
        }

        // ❌ Do NOT logout fraud users (business rule)
        if (status === 403 && errorType === "FRAUD_USER") {
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
