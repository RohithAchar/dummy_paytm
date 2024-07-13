import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SendMoney = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const toId = searchParams.get("id");
  const [amount, setAmount] = useState(1);

  const navigate = useNavigate();

  const handleTransaction = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: toId,
        amount: amount,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(res);

    if (res.status == 200) {
      alert("Transaction successful");
      navigate("/dashboard");
    } else alert("Transaction failed");
  };

  return (
    <div className="bg-neutral-900 flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-100 p-6 pt-8 rounded-lg w-96">
        <h3 className="text-3xl font-bold my-4 text-center mb-12">
          Send Money
        </h3>
        <div className="flex mb-4">
          <div className="bg-emerald-400 text-white rounded-full px-2">
            {name[0]}
          </div>
          <p className="font-bold text-xl ml-2">{name}</p>
        </div>
        <div>
          <p>Amount (in Rs)</p>
          <input
            className="w-full p-2 border-2 mb-4"
            type="number"
            placeholder="Search user"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <button
          className="w-full bg-emerald-400 text-white py-2 rounded-lg"
          onClick={() => {
            handleTransaction();
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
