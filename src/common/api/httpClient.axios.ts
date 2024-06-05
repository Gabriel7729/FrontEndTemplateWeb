import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:57678";

const apiInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
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
