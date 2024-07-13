import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    console.log(localStorage.getItem("token"));
    const newUsers = await axios.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setUsers(newUsers);
  };

  console.log(users);
  return (
    <div className="container mx-auto">
      <div className="flex justify-between py-6">
        <h2 className="text-2xl font-bold">Payments App</h2>
        <div className="flex">
          <p>Hello, User</p>
          <p className="bg-neutral-200 px-2 rounded-full ml-2">U</p>
        </div>
      </div>
      <h3 className="text-xl font-bold my-4">Your Balance $5000</h3>
      <h3 className="text-xl font-bold mb-2 mt-8">Users</h3>
      <input
        className="w-full p-2 border-2"
        type="text"
        placeholder="Search user"
      />
      <div>
        <div className="flex justify-between my-8">
          <div className="flex content-baseline">
            <p className="bg-neutral-200 px-3 rounded-full pt-2">U</p>
            <p className="font-bold ml-2 pt-2">User1</p>
          </div>
          <button className="text-white p-2 bg-black hover:bg-neutral-900 rounded-lg">
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
