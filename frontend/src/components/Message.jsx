import { useSelector } from "react-redux";
import { formatTime } from "../utils/formatTime";
const Message = ({ message }) => {
  const { authUser } = useSelector((s) => s.user);
  const isSender = message.senderId === authUser._id;

  return (
    <div
      className={`flex flex-col ${
        isSender ? "items-end" : "items-start"
      } mb-4`}
    >

      <div
        className={`
          max-w-[75%]
          px-5
          py-3
          rounded-2xl
          text-m
          leading-relaxed
          ${
            isSender
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-700 text-white rounded-bl-md"
          }
        `}
      >
        {message.message}
      </div>
      <span
        className={`
          text-[11px]
          text-gray-400
          mt-1
          ${
            isSender ? "text-right" : "text-left"
          }
        `}
      >
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
