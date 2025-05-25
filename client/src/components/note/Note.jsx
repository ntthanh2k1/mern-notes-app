import { useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { BsPin, BsPinAngle } from "react-icons/bs";
import axiosInstance from "../../utils/axios";
import { formatDate, sortNotes } from "../../utils/helper";

const Note = ({ note, setListNotes, setNoteModal, showToast }) => {
  const [error, setError] = useState(null);

  const editNoteHandler = () => {
    setNoteModal({
      isShown: true,
      type: "edit",
      data: note
    })
  };

  const pinNoteHandler = async () => {
    try {
      const res = await axiosInstance.patch(`/notes/pin-note/${note._id}`);

      if (res?.data?.data) {
        setListNotes((prev) =>
          sortNotes(prev.map((currentNote) =>
            currentNote._id === note._id? res.data.data : currentNote)));
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to pin/unpin note.");
    }
  };

  const deleteNoteHandler = async () => {
    try {
      const res = await axiosInstance.delete(`/notes/${note._id}`);

      if (res?.data) {
        setListNotes((prev) =>
          sortNotes(prev.filter((currentNote) =>
            currentNote._id !== note._id)));
        showToast(res.data.error, res.data.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to delete note.");
    }
  };

  if (error) {
    console.error(error);
  }

  return (
    <div className="border rounded p-4 bg-white hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{note.title}</h6>

          <span className="text-xs text-slate-500">{formatDate(note.createdAt)}</span>
        </div>

        {note.isPinned ? (
          <BsPinAngle className="icon-btn text-primary" onClick={pinNoteHandler} />
        ) : (
          <BsPin className="icon-btn" onClick={pinNoteHandler} />
        )}
      </div>

      <p className="text-xs text-slate-600 mt-2">{note.content?.length > 60 ? `${note.content?.slice(0, 60)}...` : note.content }</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{note.tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-yellow-500" onClick={editNoteHandler} />

          <MdDelete className="icon-btn hover:text-red-500" onClick={deleteNoteHandler} />
        </div>
      </div>
    </div>
  );
};

export default Note;
