"use client";
import axiosRequest from "@/lib/axiosRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosRequest({
        url: "/get-all-users",
        method: "GET",
      });
      //    console.log("API Response:", response);
      return response;
    },
  });
};
