import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser } = useSelector((s) => s.user);
  const isSender = message.senderId === authUser._id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div className={`
        px-3 py-2 rounded-lg text-sm max-w-xs
        ${isSender
          ? "bg-emerald-600 text-white"
          : "bg-white/10 text-white"}
      `}>
        {message.message}
      </div>
    </div>
  );
};

export default Message;
