"use client";
import { useGetAllUser, useDeleteUser } from "@/hooks/tanStackQuery/useUser";
import { useState } from "react";

const DisplayUsers = () => {
  const { data: users, isLoading, isError, error } = useGetAllUser();
  const deleteUserMutation = useDeleteUser();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <div>
      <h2 className="border-b-2 w-24 mb-3">Users list</h2>
      <ul>
        {users?.map((user) => (
          <li key={user._id} className="flex justify-between items-center">
            <span>
              <strong>{user.username}</strong> - {user.email}
            </span>
            <button
              onClick={() => {
                setDeletingId(user._id);
                deleteUserMutation.mutate(user._id, {
                  onSettled: () => setDeletingId(null),
                });
              }}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
            >
              {deletingId === user._id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
