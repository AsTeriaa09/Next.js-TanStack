"use client";
import { useGetAllUser } from "@/hooks/tanStackQuery/useUser";

const DisplayUsers = () => {
  const { data: users, isLoading, isError, error } = useGetAllUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users?.map((user: { id: string; username: string; email: string }) => (
          <li key={user.id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
