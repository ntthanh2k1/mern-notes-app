import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { LuCheck } from "react-icons/lu";

const Toast = ({ isShown, error, message, closeToastHandler }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeToastHandler();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [closeToastHandler]);

  return (
    <div className={`absolute top-20 right-3 transition-all duration-300 ${isShown? "opacity-100" : "opacity-0"}`}>
      <div className={`min-w-52 bg-white border drop-shadow rounded-md after:w-[5px] after:h-full ${error? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:top-0 after: right-0 after:rounded-l-lg`}>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className={`w-7 h-7 flex items-center justify-center rounded-full ${error? "bg-red-50" : "bg-green-50"}`}>
            {error? (
              <RxCross2 className="text-xl text-red-500"/>
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;