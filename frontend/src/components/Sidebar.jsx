import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
const Sidebar = () => {
    useGetOtherUsers();
  const [search, setSearch] = useState("");

  const { otherUsers, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredUsers = otherUsers?.filter(
    (user) => user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const logoutHandler = async () => {
    try {
      await axios.get(`${BASE_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out");
      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
        w-72
        flex flex-col
        bg-[#020617]
        border-r border-white/10
        h-screen
      "
    >

      <div className="p-4">
        <div className="flex items-center gap-2 bg-[#020617] border border-white/10 rounded-lg px-3 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="
              flex-1
              bg-transparent
              text-sm
              text-white
              placeholder-gray-400
              outline-none
            "
          />
          <BiSearchAlt2 className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <OtherUsers users={filteredUsers} />

      {authUser && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-white text-sm font-medium">
              {authUser.profilePhoto ? (
                <img
                  src={authUser.profilePhoto}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                authUser.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">
                {authUser.fullName}
              </p>
              <button
                onClick={logoutHandler}
                className="
                  text-xs
                  text-gray-400
                  hover:text-red-400
                  transition
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
