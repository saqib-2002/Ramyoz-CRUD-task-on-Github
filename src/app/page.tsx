"use client";

import { useEffect, useState } from "react";
import { IUser } from "../types/user";
import { getUsers } from "../lib/api";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <UserForm onSuccess={fetchUsers} />
      <UserTable users={users} />
    </div>
  );
}
