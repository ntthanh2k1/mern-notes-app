import { getInitialChars } from "../../utils/helper";

const ProfileInfo = ({ logoutHandler }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex justify-center items-center w-12 h-12 rounded-full font-medium bg-slate-200">
        {getInitialChars("Nguyen Tri Thanh")}
      </div>

      <div>
        <p className="text-sm font-medium">Nguyen</p>

        <button className="text-sm text-slate-700 underline" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
