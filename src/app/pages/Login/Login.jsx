import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../pages/Login/login.css";
import loginImg from "../../../assets/img/loginImg.png";
import { Button } from "reactstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userInfo = {
        username: "Nurjan",
        password: "Nurjan123",
      };

      if (!username || !password) {
        toast.error("Username and Password are required fields");
        return;
      }

      if (username === userInfo.username && password === userInfo.password) {
        localStorage.setItem("user", JSON.stringify(userInfo));
        navigate("/home");
      } else {
        toast.error("Username and Password are incorrect");
      }
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
    <section className="loginBack flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-[60%] min-h-[500px]">
        <div className="flex items-center justify-center p-6 lg:p-8 bg-primary-600 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg ">
          <img src={loginImg} alt="Login" className="w-full max-w-sm lg:max-w-md" />
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center w-[50%]">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Welcome!</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Password"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 !bg-[#103250] text-white rounded-lg   "
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
