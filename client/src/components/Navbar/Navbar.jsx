import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <Link to="/dashboard">MERN NOTES APP</Link>
      </h2>

      <SearchBar />

      <ProfileInfo logoutHandler={logoutHandler} />
    </div>
  );
};

export default Navbar;