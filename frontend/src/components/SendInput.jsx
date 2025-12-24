import { IoSend } from "react-icons/io5";
import { useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const typingRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser, authUser } = useSelector((s) => s.user);
  const { socket } = useSelector((s) => s.socket);
  const { messages } = useSelector((s) => s.message);

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket?.emit("typing", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });

    clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => {
      socket?.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
    }, 800);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await axios.post(
      `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
      { message },
      { withCredentials: true }
    );

    dispatch(setMessages([...messages, res.data.newMessage]));
    setMessage("");
  };
  
  return (
    <form onSubmit={sendMessage} className="p-3  border-white/10">
      <div className="flex items-center gap-2">
        <input
          value={message}
          onChange={handleChange}
          placeholder="Type a message"
          className="
            flex-1 px-3 py-2
            bg-white/5
            text-sm text-white
            rounded-md
            border border-white/10
            focus:outline-none
          "
        />
        <button className="text-gray-400 hover:text-white">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
