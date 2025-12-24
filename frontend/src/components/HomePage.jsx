import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div
      className="
        flex
        h-screen
        w-full
        bg-[#020617]
        text-white
      "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Chat area */}
      <div className="flex-1 flex justify-center items-center">
        <div
          className="
            w-full
            max-w-5xl
            h-[85vh]
            bg-[#020617]
            border border-white/10
            rounded-xl
            shadow-xl
            flex
          "
        >
          <MessageContainer key={selectedUser?._id} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
