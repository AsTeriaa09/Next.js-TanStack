import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const axiosRequest = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (res: AxiosResponse<T>): T => {
    return res.data;
  };

  const onError = (err: AxiosError): never => {
    if (err.response) {
      throw err.response.data;
    }
    throw new Error(err.message);
  };

  return axios(options).then(onSuccess).catch(onError);
};

export default axiosRequest;

