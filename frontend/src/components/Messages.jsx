import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { useSelector } from "react-redux";


const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector(store=>store.message);
    console.log("value of messages is: ", messages);
  return (
    <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
      {
        messages && messages?.map((msg) => (
        <Message key={msg._id} message={msg} />
      ))
      }
    </div>
  );
};

export default Messages;
