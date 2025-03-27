import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosRequest = async (options: AxiosRequestConfig) => {
  try {
    const response = await axios(options);
    return response.data;
  } catch (err: any) {
    throw err?.response?.data || "An unexpected error occurred";
  }
};

export default axiosRequest;
