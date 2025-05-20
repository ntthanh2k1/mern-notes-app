import { Link } from "react-router-dom";
import UserInfo from "../common/UserInfo";
import SearchBar from "../common/SearchBar";

const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <Link to="/">MERN NOTES APP</Link>
      </h2>

      <SearchBar />

      <UserInfo />
    </div>
  );
};

export default Navbar;