import { useState } from "react";
import TagInput from "../../components/common/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ type, noteData, closeHandler }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  // Add note
  const addNote = async () => {

  };

  // Edit note
  const editNote = async () => {

  };

  const addEditNoteHandler = () => {
    if (!title) {
      setError("Title is required.");
      return;
    }

    if (!content) {
      setError("Content is required.");
      return;
    }

    setError("");

    if (type === "add") {
      addNote();
    }
    else {
      editNote();
    }
  };

  return (
    <div className="relative">
      <button className="flex items-center justify-center rounded-full w-10 h-10 absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={closeHandler}>
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="This is title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }} />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="This is content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }} />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags}
          setTags={setTags} />
      </div>

      {error && (<p className="text-red-500 text-sm pt-4">{error}</p>)}

      <button className="btn-primary font-medium mt-5 p-3"
        onClick={addEditNoteHandler}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
