import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchUsers = async () => {
    const newUsers = await axios.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    if (newUsers.status == 200) setUsers(newUsers.data.users);
  };
  const fetchBalance = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    if (res.status == 200) setBalance(res.data.balance);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between py-6">
        <h2 className="text-2xl font-bold">Payments App</h2>
        <div className="flex">
          <p>Hello, User</p>
          <p className="bg-neutral-200 px-2 rounded-full ml-2">U</p>
        </div>
      </div>
      <h3 className="text-xl font-bold my-4">
        Your Balance ${parseFloat(balance).toFixed(2)}
      </h3>
      <h3 className="text-xl font-bold mb-2 mt-8">Users</h3>
      <input
        className="w-full p-2 border-2"
        type="text"
        placeholder="Search user"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div>
        {users.map((user) => {
          return (
            <div key={users._id}>
              <div className="flex justify-between my-8">
                <div className="flex content-baseline">
                  <p className="bg-neutral-200 px-3 rounded-full pt-2">
                    {user.firstName[0]}
                  </p>
                  <p className="font-bold ml-2 pt-2">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <button
                  className="text-white p-2 bg-black hover:bg-neutral-900 rounded-lg"
                  onClick={() => {
                    navigate(
                      "/send?id=" +
                        user._id +
                        "&name=" +
                        user.firstName +
                        " " +
                        user.lastName
                    );
                  }}
                >
                  Send Money
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
