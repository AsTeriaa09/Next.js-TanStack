"use client";
import axiosRequest from "@/lib/axiosRequest";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  email: string;
}

export const useGetAllUser = () => {
  return useQuery<User[], Error>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosRequest<User[]>({
        url: "/get-all-users",
        method: "GET",
      });
      //    console.log("API Response:", response);
      // return response;
    },
  });
};
