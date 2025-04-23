import { useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";

const Home = () => {
  const [isPinned, setIsPinned] = useState(false);

  const pinNoteHandler = () => {
    setIsPinned(!isPinned);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard title="This is title"
            date="23/04/2025"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione voluptate aliquid quia quasi modi ex earum et commodi iste. Modi pariatur minima assumenda ipsa beatae nobis natus earum possimus accusamus!"
            tags="#tag"
            isPinned={isPinned}
            editHandler={() => {}}
            deleteHandler={() => {}}
            pinNoteHandler={pinNoteHandler} />
        </div>
      </div>

      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <MdAdd className="text-[32px] text-white" />
      </div>
    </>
  );
};

export default Home;
