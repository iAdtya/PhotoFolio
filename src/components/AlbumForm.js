import { useRef } from "react";
import { db } from "../firebase-Init";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AlbumForm() {
  //for album name
  const nameRef = useRef();
  // to clear the form
  function clearForm(e) {
    e.preventDefault();
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "albums"), {
      Albumname: nameRef.current.value,
      imageList: [],
    });
    toast.success(`Album added successfully!`);
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center">
        <h1 className="text-white mb-4 text-3xl">Create an Album</h1>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            ref={nameRef}
            required
            className="w-1/2 px-4 py-2 border text-black  border-gray-300 rounded"
          />
          <button
            className="px-4 py-2 text-white bg-pink-600 rounded"
            onClick={clearForm}
          >
            Clear
          </button>
          <button className="px-4 py-2 text-white bg-blue-700 rounded">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
