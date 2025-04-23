import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border px-5 rounded mb-3">
      <input type={isShowPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" />
      
      {isShowPassword ? (
        <FaRegEye size={22}
          className="text-primary cursor-pointer"
          onClick={showPasswordHandler} />
      ) : (
        <FaRegEyeSlash size={22}
          className="text-slate-400 cursor-pointer"
          onClick={showPasswordHandler} />
      )}
    </div>
  );
};

export default PasswordInput;
