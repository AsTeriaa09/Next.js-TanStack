"use client";
import { useGetAllUser } from "@/hooks/tanStackQuery/useUser";

const DisplayUsers = () => {
  const { data: users, isLoading, isError, error } = useGetAllUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <div>
      <h2 className="border-b-2 w-24 mb-3">Users list</h2>
      <ul>
        {users?.map((user) => (
          
            <li key={user.id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
          
         
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
