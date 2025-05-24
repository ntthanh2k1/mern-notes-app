import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import ListNotes from "../../components/cards/ListNotes";
import { sortNotes } from "../../utils/helper";
import axiosInstance from "../../utils/axios";

const Home = () => {
  const [listNotes, setListNotes] = useState([]);
  const [error, setError] = useState(null);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

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

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <ListNotes
          listNotes={listNotes}
          setListNotes={setListNotes}
          error={error} />
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
        ariaHideApp={false}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <AddEditNotes type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          closeHandler={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          listNotes={listNotes}
          setListNotes={setListNotes} />
      </Modal>
    </>
  );
};

export default Home;
