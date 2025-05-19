import { getInitialChars } from "../../utils/helper";

const ProfileInfo = ({ authUser, logoutHandler }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex justify-center items-center w-12 h-12 rounded-full font-medium bg-slate-200">
        {getInitialChars(authUser?.name)}
      </div>

      <div>
        <p className="text-sm font-medium">{authUser?.username.length > 10 ? `${authUser?.username?.slice(0, 10)}...` : authUser?.username }</p>

        <button className="text-sm text-slate-700 underline" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
