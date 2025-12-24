import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) return null;

  return (
    <div className="flex-1 overflow-y-auto space-y-1">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
