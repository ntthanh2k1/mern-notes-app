import { useState } from 'react';
import PasswordInput from '../../components/Input/PasswordInput';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username required.");
      return;
    }

    if (!password) {
      setError("Password required.");
      return;
    }

    setError("");

    try {
      await axiosInstance.post("/auth/login", {
        username,
        password
      });

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={loginHandler}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" placeholder="Username" className="input-box"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }} />

            <PasswordInput placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }} />

            {error && (<p className="text-red-500 text-sm pb-1">{error}</p>)}

            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/register" className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
