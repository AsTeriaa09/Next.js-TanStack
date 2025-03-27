"use client";
import { useState } from "react";
import { useAddUser } from "@/hooks/tanStackQuery/useUser";

const AddUser = () => {
  const { mutate, isError, error, isSuccess } = useAddUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="my-5 border-2">
      <h3>Add New User</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="bg-amber-700 p-2 rounded ml-2 my-3" type="submit">
          Add User
        </button>
      </form>

      {isSuccess && <p style={{ color: "green" }}>User added successfully!</p>}
      {isError && (
        <p style={{ color: "red" }}>
          Error: {error?.message || "Something went wrong"}
        </p>
      )}
    </div>
  );
};

export default AddUser;
