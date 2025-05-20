import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();

  return authUser.isAuthenticated? children : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
