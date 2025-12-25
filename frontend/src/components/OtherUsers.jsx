import OtherUser from "./OtherUser";
const OtherUsers = ({ users }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {users?.length > 0 ? (
        users.map((user) => (
          <OtherUser key={user._id} user={user} />
        ))
      ) : (
        <p className="text-sm text-gray-400 text-center mt-4">
          No users found
        </p>
      )}
    </div>
  );
};

export default OtherUsers;
