import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);      
      setInputValue("");
    }
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const removeTagHandler = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (<div className="flex items-center gap-2 flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span key={index}
            className="flex items-center gap-2 flex-wrap mt-2 text-sm text-slate-900 bg-slate-100 py-1 rounded">
            #{tag}
            <button className="" onClick={() => {
              removeTagHandler(tag);
            }}>
              <MdClose />
            </button>
          </span>
        ))}
      </div>)}

      <div className="flex items-center gap-4 mt-3">
        <input type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={keyDownHandler} />

        <button className="flex items-center justify-center w-8 h-8 rounded border border-blue-600 hover:bg-blue-600"
          onClick={() => {
            addNewTag();
          }}>
          <MdAdd className="text-4xl text-blue-600 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
