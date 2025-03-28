"use client";
import { useGetAllUser, useDeleteUser, useUpdateUser } from "@/hooks/tanStackQuery/useUser";
import { useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const DisplayUsers = () => {
  const { data: users, isLoading, isError, error } = useGetAllUser();
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
            <div>
              <button
                onClick={() => {
                  setDeletingId(user._id);
                  deleteUserMutation.mutate(user._id, {
                    onSettled: () => setDeletingId(null),
                  });
                }}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
                disabled={deletingId === user._id}
              >
                {deletingId === user._id ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setEditingUser(user)}
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            />
            <input
              type="email"
              className="w-full p-2 border rounded mb-2"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded mb-2"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateUserMutation.mutate(
                    { _id: editingUser._id, username: editingUser.username, email: editingUser.email, role: editingUser.role },
                    { onSuccess: () => setEditingUser(null) }
                  );
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;
