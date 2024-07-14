import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";
import { useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dummy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Dummy = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/signup");

  const fetchUser = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status == 200) {
      navigate("/dashboard");
      return;
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
};

export default App;
