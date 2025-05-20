import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/get-auth-user");
        
        if (res?.data?.data) {
          setAuthUser(res.data.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error(`Failed to get auth user: ${error}`);
        }
      }
    };

    getAuthUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
