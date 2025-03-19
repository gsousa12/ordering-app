import { useEffect } from "react";

import { loginUser } from "../redux/slices/authSlice";
import api from "../../../_shared/axios/axiosInstance";
import { useAppDispatch } from "../../../_shared/redux/hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const { data } = await api.post("/auth/refresh", {
            refresh_token: refreshToken,
          });
          dispatch(loginUser({ email: data.user.email, password: "" }));
        } catch (error) {
          localStorage.removeItem("refresh_token");
        }
      }
    };
    checkAuth();
  }, [dispatch]);
};

export default useAuth;
