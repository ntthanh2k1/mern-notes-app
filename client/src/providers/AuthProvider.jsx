import { useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import axiosInstance from "../utils/axios";
import Loading from "../components/common/Loading";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState({
    isAuthenticated: false,
    name: "",
    username: ""
  });
  
  const getAuthUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/get-auth-user");

      setAuthUser({
        isAuthenticated: true,
        name: res.data.data.name,
        username: res.data.data.username
      });
    } catch {
      setAuthUser({
        isAuthenticated: false,
        name: "",
        username: ""
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
