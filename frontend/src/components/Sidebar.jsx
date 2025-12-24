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

const Sidebar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();
  const logoutHandler = async () => {
    await axios.get(`${BASE_URL}/api/v1/user/logout`);
    toast.success("Logged out");
    navigate("/login");
    dispatch(setAuthUser(null));
    dispatch(setMessages([]));
    dispatch(setOtherUsers(null));
    dispatch(setSelectedUser(null));
  };

  return (
    <div className="
      w-72
      flex flex-col
      bg-[#020617]
      border-r border-white/10
      p-4
    ">
      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <input
          placeholder="Search"
          className="
            w-full px-3 py-2
            bg-white/5
            text-sm text-white
            rounded-md
            border border-white/10
            focus:outline-none
          "
        />
        <BiSearchAlt2 className="text-gray-400" />
      </div>

      {/* Users */}
      <OtherUsers />

      {/* Logged-in user */}
      {authUser && (
        <div className="mt-4 pt-4 border-t border-white/10">
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

            <p className="text-sm text-white truncate">
              {authUser.fullName}
            </p>
          </div>
        </div>
      )}

      {/* Logout */}
      <button
        onClick={logoutHandler}
        className="
          mt-3
          text-sm text-gray-400
          hover:text-white
          transition
          self-start
        "
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
