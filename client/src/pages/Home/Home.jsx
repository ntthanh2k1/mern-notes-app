import { useState } from "react";
import NoteCard from "../../components/cards/NoteCard";
import Navbar from "../../components/layout/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard title="This is title"
            date="23/04/2025"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione voluptate aliquid quia quasi modi ex earum et commodi iste. Modi pariatur minima assumenda ipsa beatae nobis natus earum possimus accusamus!"
            tags="#tag"
            isPinned={true}
            editHandler={() => {}}
            deleteHandler={() => {}}
            pinNoteHandler={() => {}} />
        </div>
      </div>

      <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <AddEditNotes type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          closeHandler={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}/>
      </Modal>
    </>
  );
};

export default Home;
