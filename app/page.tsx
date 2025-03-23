"use client";
import { getUsers } from "@/client/users";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const todo = useQuery({ queryKey: ["todos"], queryFn: getUsers });
  console.log(todo.data);
  return (
    <>
      {todo.data?.map((cur: User) => {
        return <div key={cur.id}>name: {cur.name}</div>;
      })}
    </>
  );
}
