import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MiniProfile = () => {
  const {
    auth: { user },
    logoutUser,
  } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between p-4 bg-green-600">
      <div className="flex">
        {/* <p>img</p> */}
        <p className="text-lg">{user?.username}</p>
      </div>
      <button
        onClick={() => logoutUser()}
        className="px-4 py-1 bg-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default MiniProfile;
