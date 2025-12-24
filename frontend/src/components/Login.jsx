import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "..";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        user,
        { withCredentials: true }
      );
      dispatch(setAuthUser(res.data));
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }

    setUser({ username: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div
        className="
          w-full max-w-sm
          bg-[#020617]
          border border-white/10
          rounded-xl
          p-6
          shadow-xl
        "
      >
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome back
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              type="text"
              placeholder="Enter your username"
              className="
                w-full px-3 py-2
                bg-white/5
                text-sm text-white
                rounded-md
                border border-white/10
                placeholder-gray-500
                focus:outline-none
                focus:border-emerald-500/50
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              type="password"
              placeholder="Enter your password"
              className="
                w-full px-3 py-2
                bg-white/5
                text-sm text-white
                rounded-md
                border border-white/10
                placeholder-gray-500
                focus:outline-none
                focus:border-emerald-500/50
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-2
              rounded-md
              bg-emerald-600
              text-white text-sm font-medium
              hover:bg-emerald-500
              transition
            "
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
