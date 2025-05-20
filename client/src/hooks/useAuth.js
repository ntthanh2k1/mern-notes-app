import { useContext } from "react";
import AuthContext from "../context/auth.context.js";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
