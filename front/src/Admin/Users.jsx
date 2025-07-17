import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaTrash } from "react-icons/fa";

function Users() {
  const [users, getUsers] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getUsers(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
     
        getUsers((prev) => prev.filter((u) => u._id !== userId));
      })
      .catch((error) => {
        console.log(`Error Deleting User: ${error}`);
      });
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-auto">
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4">Users</h2>
              <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      User ID
                    </th> */}
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Created At
                    </th>
                    {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Updated At
                    </th> */}
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Remove User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {/* <td className="py-3 px-4">{user._id}</td> */}
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.phone}</td>
                      <td className="py-3 px-4">{user.createdAt}</td>
                      {/* <td className="py-3 px-4">{user.updatedAt}</td> */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 ml-10"
                          aria-label={`Delete user ${user.name}`}
                          title="Delete user"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Users;
