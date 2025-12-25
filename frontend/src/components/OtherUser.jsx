import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((s) => s.user);
  const isOnline = onlineUsers?.includes(user._id);

  return (
    <div
      onClick={() => dispatch(setSelectedUser(user))}
      className={`
        flex items-center gap-3 p-2 rounded-md cursor-pointer
        transition
        ${selectedUser?._id === user._id
          ? "bg-white/10"
          : "hover:bg-white/5"}
      `}
    >
      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
        {user.profilePhoto?(
          <img src={user.profilePhoto} alt="profile" className="w-full h-full object-cover rounded-full"/>
        ):(
          user.fullName?.split(" ").map((n)=>n[0]).join("").toUpperCase()
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-white">{user.fullName}</p>
        <p className="text-xs text-gray-400">
          {isOnline ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
