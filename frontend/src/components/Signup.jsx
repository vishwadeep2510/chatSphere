import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {BASE_URL } from "..";
import { setLoading } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading } = useSelector((store) => store.user);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const res = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }finally{
      dispatch(setLoading(false));
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
    setProfilePhoto(null);
    setPreview(null);
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
          Create your account
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          
          <Input
            label="Full Name"
            value={user.fullName}
            onChange={(v) => setUser({ ...user, fullName: v })}
          />

          
          <Input
            label="Username"
            value={user.username}
            onChange={(v) => setUser({ ...user, username: v })}
          />

        
          <Input
            label="Password"
            type="password"
            value={user.password}
            onChange={(v) => setUser({ ...user, password: v })}
          />

          
          <Input
            label="Confirm Password"
            type="password"
            value={user.confirmPassword}
            onChange={(v) =>
              setUser({ ...user, confirmPassword: v })
            }
          />

          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
              />
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
              />
              Female
            </label>
          </div>

          
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Profile photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
                w-full text-sm text-gray-300
                file:bg-white/5
                file:border-0
                file:rounded-md
                file:px-3 file:py-2
                file:text-white
                hover:file:bg-white/10
              "
            />
          </div>

          
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover border border-white/10"
              />
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className={`
    w-full py-2
    rounded-md
    text-sm font-medium
    flex items-center justify-center gap-2
    transition
    ${
      loading
        ? "bg-emerald-600/60 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-500"
    }
    text-white
  `}
          >
            {loading ? (
              <>
                <span
                  className="
          w-4 h-4
          border-2 border-white/30
          border-t-white
          rounded-full
          animate-spin
        "
                />
                Signing up…
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
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
);

export default Signup;
