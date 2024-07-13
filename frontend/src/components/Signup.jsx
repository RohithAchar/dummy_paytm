import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
      firstName,
      lastName,
      username: email,
      password,
    });
    if (res.status == 200) {
      navigate("/dashboard");
      localStorage.setItem("token", res.data.token);
      return;
    } else alert(res.message);
  };

  return (
    <div className="bg-neutral-900 h-[100vh] flex justify-center items-center">
      <div className="container mx-auto bg-neutral-100 w-96 p-10 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Sign Up</h2>
        <p className="text-neutral-700 mb-4">
          Enter your information to create an account
        </p>
        <div className="text-left">
          <div className="my-2">
            <p className="my-1">First Name</p>
            <input
              className="w-full p-2 border-2"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <p className="my-1">Last Name</p>
            <input
              className="w-full p-2 border-2"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <p className="my-1">Email</p>
            <input
              className="w-full p-2 border-2"
              type="text"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <p className="my-1">Password</p>
            <input
              className="w-full p-2 border-2"
              type="password"
              placeholder="John"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSignUp}
            className="mt-4 w-full bg-black text-white p-4 hover:bg-neutral-900 rounded-lg"
          >
            Sign Up
          </button>
          <p className="mt-2">
            Already have an account ?{" "}
            <Link className="underline text-blue" to="/signin">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
