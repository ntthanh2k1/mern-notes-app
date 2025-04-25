import { MdAdd } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <input type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags" />

        <button className="flex items-center justify-center w-8 h-8 rounded border border-blue-600 hover:bg-blue-600">
          <MdAdd className="text-4xl text-blue-600 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
