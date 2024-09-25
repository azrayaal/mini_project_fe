import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Penjualan() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
    { id: 3, name: "Alice Smith", email: "alicesmith@example.com" },
    { id: 4, name: "Bob Johnson", email: "bobjohnson@example.com" },
  ]);

  const handleDelete = (id: any) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center pb-4">
        <div className="font-bold text-lg">Penjualan</div>
        <Link to="/penjualan/add">
          <button className="ml-2 px-4 py-1 h-8 bg-blue-500 text-white rounded text-sm">
            Tambah
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-600 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                NO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: any) => (
              <tr
                key={user.id}
                className={`border-b hover:cursor-pointer hover:bg-gray-400  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/penjualan/edit/${user.id}`}>
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
