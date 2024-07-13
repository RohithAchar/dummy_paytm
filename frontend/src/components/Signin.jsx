import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: email,
      password,
    });
    if (res.status == 200) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else alert(res.message);
  };

  return (
    <div className="bg-neutral-900 h-[100vh] flex justify-center items-center">
      <div className="container mx-auto bg-neutral-100 w-96 p-10 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Sign In</h2>
        <p className="text-neutral-700 mb-4">
          Enter your credentials to access your account
        </p>
        <div className="text-left">
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
          <div>
            <button
              onClick={handleSignIn}
              className="mt-4 w-full bg-black text-white p-4 hover:bg-neutral-900 rounded-lg"
            >
              Sign In
            </button>
            <p className="mt-2">
              Already have an account ?{" "}
              <Link className="underline text-blue" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
