import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "../store/session.store";

const baseURL = "http://localhost:5001/api";

const apiInstance = axios.create({
  baseURL,
});

apiInstance.interceptors.request.use((config) => {
  const idToken = useAuthStore.getState().getToken();
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const UNAUTHORIZED = 401;
    if (response.status === UNAUTHORIZED) {
      console.log("✋🏻✋🏻✋🏻 Not Authenticated: ", response.data);
    }
    return response;
  },
  (error: any) => {
    console.error("Response Error:", error);
    return Promise.reject(new Error(error));
  }
);

export default apiInstance;
