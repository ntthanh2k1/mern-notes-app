import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axios";
import { getInitialChars } from "../../utils/helper";

const UserInfo = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axiosInstance.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex justify-center items-center w-12 h-12 rounded-full font-medium bg-slate-200">
        {getInitialChars(authUser?.name)}
      </div>

      <div>
        <p className="text-sm font-medium">{authUser?.username.length > 10 ? `${authUser?.username.slice(0, 10)}...` : authUser?.username}</p>

        <button className="text-sm text-slate-700 underline" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default UserInfo;
