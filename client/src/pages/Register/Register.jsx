import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/common/PasswordInput";
import { isValidEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name required.");
      return;
    }

    if (!email) {
      setError("Email required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email's format not valid.");
      return;
    }

    if (!username) {
      setError("Username required.");
      return;
    }

    if (!password) {
      setError("Password required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    try {
      await axiosInstance.post("/auth/register", {
        name,
        email,
        username,
        password
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to register.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={registerHandler}>
            <h4 className="text-2xl mb-7">Register</h4>

            <input type="text" placeholder="Name" className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }} />
            
            <input type="text" placeholder="Email" className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }} />

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

            <button type="submit" className="btn-primary">Register</button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
