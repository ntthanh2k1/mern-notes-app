import { LuNotepadText } from "react-icons/lu";
import EmptyNote from "./EmptyNote";
import Note from "./Note";

const ListNotes = ({ listNotes, setListNotes, setNoteModal, showToast }) => {
  return (
    <>
      {listNotes.length > 0? (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {listNotes.map((note) => (
            <Note
              key={note._id}
              note={note}
              setListNotes={setListNotes}
              setNoteModal={setNoteModal}
              showToast={showToast} />
          ))}
        </div>
      ) : (
        <EmptyNote
          image={<LuNotepadText size={250} />}
          message={`You don't have any note. Click '+' button to create new one.`} />
      )}
    </>
  );
};

export default ListNotes;