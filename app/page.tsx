"use client";
import { getUsers } from "@/client/users";
import { createUser } from "@/server/users";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const todo = useQuery({ queryKey: ["todos"], queryFn: getUsers });
  // console.log(todo.data);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <>
      <button onClick={() => mutation.mutate({ id: 1, name: "rupa" })}>
        create user
      </button>
      {todo.data?.map((user: User) => {
        return <div key={user.id}>name: {user.name}</div>;
      })}
    </>
  );
}
