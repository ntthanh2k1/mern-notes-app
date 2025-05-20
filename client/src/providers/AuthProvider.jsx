import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import AuthContext from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/get-auth-user");
        
        if (res?.data?.data) {
          setAuthUser(res.data.data);
        }
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getAuthUser();
  }, [navigate]);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
