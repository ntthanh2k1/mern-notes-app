import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axios";
import { getInitialChars } from "../../utils/helper";
import { useState } from "react";

const UserInfo = () => {
  const [error, setError] = useState(null);

  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      setAuthUser({
        isAuthenticated: false,
        name: "",
        username: ""
      });

      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to logout.");
    }
  };

  if (error) {
    console.error(error);
  }

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
