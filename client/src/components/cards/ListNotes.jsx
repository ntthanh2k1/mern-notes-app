import Note from "./Note";

const ListNotes = ({ listNotes, setListNotes, error }) => {
  if (error) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {listNotes.map((note) => (
        <Note
          key={note._id}
          note={note}
          listNotes={listNotes}
          setListNotes={setListNotes} />
      ))}
    </div>
  );
};

export default ListNotes;