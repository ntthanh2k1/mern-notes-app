import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import axiosInstance from "../../utils/axios";

const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {

  };

  const clearSearchHandler = () => {
    setSearchString("");
  };

  const logoutHandler = async () => {
    await axiosInstance.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <Link to="/">MERN NOTES APP</Link>
      </h2>

      <SearchBar value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        searchHandler={searchHandler}
        clearSearchHandler={clearSearchHandler} />

      <ProfileInfo logoutHandler={logoutHandler} />
    </div>
  );
};

export default Navbar;