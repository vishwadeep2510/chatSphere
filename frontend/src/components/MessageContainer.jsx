import Messages from "./Messages";
import SendInput from "./SendInput";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, onlineUsers, typingUser } = useSelector(
    (store) => store.user
  );

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select a conversation
      </div>
    );
  }

  const isOnline = onlineUsers?.includes(selectedUser._id);
  const isTyping = typingUser === selectedUser._id;

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-white text-sm font-medium">
          {selectedUser.profilePhoto ? (
            <img
              src={selectedUser.profilePhoto}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            selectedUser.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          )}
        </div>


        <div className="flex flex-col">
          <p className="text-sm font-medium text-white">
            {selectedUser.fullName}
          </p>
          <p className="text-xs text-gray-400">
            {isTyping ? "typing…" : isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>

  
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <Messages />
      </div>


      <div className="border-t border-white/10 px-3 py-2">
        <SendInput />
      </div>
    </div>
  );
};

export default MessageContainer;
