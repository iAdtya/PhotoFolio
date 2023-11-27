import { useEffect, useRef } from "react";
import { db } from "../firebase-Init";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ImageForm component for adding and updating images
export function ImageForm(props) {
  const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;
  const imageNameRef = useRef();
  const imageUrlRef = useRef();

  // Populate the form fields when an image is being updated
  useEffect(() => {
    if (updateImage) {
      imageNameRef.current.value = updateImage.name;
      imageUrlRef.current.value = updateImage.link;
    }
  }, [updateImage]);

  // Function to clear the form fields
  function clearForm() {
    imageNameRef.current.value = null;
    imageUrlRef.current.value = null;
    imageNameRef.current.focus();
  }

  // Function to handle form submission when updating an image
  async function handleUpdateSubmit(e) {
    e.preventDefault();

    const oldData = {
      name: updateImage.name,
      link: updateImage.link,
    };
    const newData = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };
    const albumRef = doc(db, "albums", albumId);
    updateDoc(albumRef, {
      imageList: arrayUnion(newData),
    });

    updateDoc(albumRef, {
      imageList: arrayRemove(oldData),
    });
    toast.success("Image Updated Successfully");
    setUpdateImage(null);
    setShowImageForm(false);
    clearForm();
  }

  // Function to handle form submission when adding a new image
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };
    const albumRef = doc(db, "albums", albumId);
    await updateDoc(albumRef, {
      imageList: arrayUnion(data),
    });
    toast.success("Image Added Successfully");
    clearForm();
  }

  // Render the form
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg">
        <h1 className="text-white text-3xl mb-4">
          {!updateImage ? "Add Image" : "Update Image"}
        </h1>
        <form
          onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}
          className="flex space-x-4"
        >
          <input
            type="text"
            placeholder="Image Name"
            ref={imageNameRef}
            required
            className="w-1/2 px-4 py-2 text-black border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Image Url"
            ref={imageUrlRef}
            required
            className="w-1/2 px-4 py-2 text-black border border-gray-300 rounded"
          />
          <button
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded"
            onClick={clearForm}
          >
            Clear
          </button>
          <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
            {!updateImage ? "Add" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
}