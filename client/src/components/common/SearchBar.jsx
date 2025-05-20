import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, searchHandler, clearSearchHandler }) => {
  return (
    // dùng 'items-center' thì items ở giữa vẫn bị lệch nếu độ dài 2 items ở 2 đầu có kích
    // thước khác nhau, dùng thêm 'absolute left-1/2 -translate-x-1/2' để căn giữa chính xác
    // cho item ở giữa
    <div className="flex items-center absolute left-1/2 -translate-x-1/2 w-80 px-4 bg-slate-100 rounded-md">
      <input type="text"
        className="w-full text-sx bg-transparent py-[11px] outline-none"
        placeholder="Search"
        value={value}
        onChange={onChange} />

      {value && (<IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-2" onClick={clearSearchHandler} />)}

      <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" onClick={searchHandler} />
    </div>
  );
};

export default SearchBar;
