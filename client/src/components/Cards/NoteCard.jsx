import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { BsPin, BsPinAngle } from "react-icons/bs";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  editHandler,
  deleteHandler,
  pinNoteHandler
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>

          <span className="text-xs text-slate-500">{date}</span>
        </div>

        {isPinned ? (
          <BsPinAngle className="icon-btn text-primary" onClick={pinNoteHandler} />
        ) : (
          <BsPin className="icon-btn" onClick={pinNoteHandler} />
        )}
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.length > 60 ? `${content?.slice(0, 60)}...` : content }</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-yellow-500" onClick={editHandler} />

          <MdDelete className="icon-btn hover:text-red-500" onClick={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
