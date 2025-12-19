// src/components/UserTable.tsx
import { IUser } from "../types/user";

interface Props {
  users: IUser[];
}

export default function UserTable({ users }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t text-center">
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
