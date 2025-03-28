"use client";
import axiosRequest from "@/lib/axiosRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AddUserBody {
  username: string;
  email: string;
  password: string;
  role: string;
}


export const useGetAllUser = () => {
  return useQuery<User[], Error>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosRequest<User[]>({
        url: "/get-all-users",
        method: "GET",
      });
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, AddUserBody>({
    mutationKey: ["addUser"],
    mutationFn: async (body: AddUserBody) => {
      return await axiosRequest<User>({
        url: "/add-user",
        method: "POST",
        data: body,
      });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["allUsers"]);
    }
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationKey: ["deleteUser"],
    mutationFn: async (_id: string) => {
      await axiosRequest<void>({
        url: `/delete-user/${_id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]); 
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { _id: string; username: string; email: string; role: string }>({
    mutationKey: ["UpdateUser"],
    mutationFn: async ({ _id, username, email, role }) => {
      return await axiosRequest<User>({
        url: `/update-user/${_id}`,
        method: "PUT",
        data: { username, email, role },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });
};