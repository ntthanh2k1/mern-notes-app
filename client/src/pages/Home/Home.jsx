import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import ListNotes from "../../components/note/ListNotes";
import { sortNotes } from "../../utils/helper";
import axiosInstance from "../../utils/axios";
import NoteModal from "./NoteModal";
import Toast from "../../components/common/Toast";

const Home = () => {
  const [listNotes, setListNotes] = useState([]);
  const [error, setError] = useState(null);
  const [noteModal, setNoteModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [toast, setToast] = useState({
    isShown: false,
    error: false,
    message: ""
  });

  const showToast = (error, message) => {
    setToast({
      isShown: true,
      error: error,
      message: message
    });
  };

  const closeToastHandler = () => {
    setToast({
      isShown: false,
      message: ""
    });
  };

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes");
      
      if (res?.data?.data) {
        setListNotes(sortNotes(res.data.data));
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to get all notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <ListNotes
          listNotes={listNotes}
          setListNotes={setListNotes}
          setNoteModal={setNoteModal}
          showToast={showToast} />
      </div>

      <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setNoteModal({ isShown: true, type: "add", data: null });
        }}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal isOpen={noteModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }
        }}
        ariaHideApp={false}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <NoteModal type={noteModal.type}
          note={noteModal.data}
          setListNotes={setListNotes}
          showToast={showToast}
          closeHandler={() => {
            setNoteModal({ isShown: false, type: "add", data: null });
          }} />
      </Modal>

      <Toast
        isShown={toast.isShown}
        error={toast.error}
        message={toast.message}
        closeToastHandler={closeToastHandler} />
    </>
  );
};

export default Home;
