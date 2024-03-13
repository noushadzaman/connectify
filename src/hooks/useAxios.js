import { useEffect } from "react";
import { api } from "../api/index";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    //! request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //! response interceptor
    const responseIntercept = api.interceptors.response.use((response) => {
      response,
        async (error) => {
          const originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshToken = auth?.refreshToken;
              const res = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
                { refreshToken }
              );
              const { token } = res.data;
              console.log(`New Token: ${token}`);
              setAuth({ ...auth, authToken: token });
              originalRequest.headers.Authorization = `Bearer ${token}`;

              return axios(originalRequest);
            } catch (error) {
              console.log(error);
              throw error;
            }
          }
          return Promise.reject(error);
        };
    });

    //! clear
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.request.eject(responseIntercept);
    };
  }, [auth.authToken]);
  return { api };
};

export default useAxios;
