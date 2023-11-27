import { useEffect, useState } from "react";
import { ImageForm } from "./ImageForm";
import { Image } from "./Image";
import { db } from "../firebase-Init";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ImageList(props) {
  const { openAlbum, setOpenAlbum } = props;
  // to show or hide add image form
  const [showImageForm, setShowImageForm] = useState(false);
  // for updating an image
  const [updateImage, setUpdateImage] = useState(null);
  // imagelist containing all the images within an album
  const [imageList, setImageList] = useState([]);
  // for searching image within an album
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleBackClick(e) {
    e.preventDefault();
    setOpenAlbum({ albumId: "", show: false });
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "albums", openAlbum.albumId), (doc) => {
      const data = doc.data().imageList;
      setImageList(data);
    });
  }, []);

  async function handleImageDelete(image) {
    const albumRef = doc(db, "albums", openAlbum.albumId);
    await updateDoc(albumRef, {
      imageList: arrayRemove(image),
    });
    toast.success("Image Successfully Deleted from your Album!");
  }

  function handleImageEdit(image) {
    setUpdateImage(image);
    setShowImageForm(true);
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ToastContainer />

      <div className="btnContainer w-1/2 flex ">
        {/* back button to redirect to album list page */}
        <button
          className="px-4 py-2 text-white bg-yellow-600 rounded"
          onClick={handleBackClick}
        >
          Back
        </button>

        {/* input box to search image in album */}
        <input
          type="text"
          placeholder="Search Image..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 mx-auto my-2 p-2 rounded-md bg-gray-700 text-white placeholder-gray-300"
        />

        {/* Add image / cancel button */}
        {/* open / hide image form */}
        <button
          className="px-4 py-2 text-white bg-pink-600 rounded"
          onClick={() => setShowImageForm(!showImageForm)}
        >
          {!showImageForm ? "Add Image" : "Cancel"}
        </button>
      </div>

      {/* image form to add image */}
      <div className="text-center">
        {showImageForm && (
          <ImageForm
            albumId={openAlbum.albumId}
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
            setShowImageForm={setShowImageForm}
          />
        )}
        {/* collection heading on condition */}
        {/* if album is empty it will show different heading */}
        <h1 className="text-white text-2xl mb-4">
          {imageList.length !== 0
            ? "Your Collection"
            : "No Images in Your Collection"}
        </h1>
      </div>

      {/* looping over each image in list and showing them within a box */}
      <div className="imageList">
        {imageList
          .filter((image) => {
            return search.toLocaleLowerCase() === ""
              ? image
              : image.name.toLocaleLowerCase().includes(search);
          })
          .map((image, i) => (
            <div
              key={i}
              index={i}
              className="w-44 h-44 flex flex-col m-2 rounded overflow-hidden shadow-md bg-gray-700 p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-500"
              onClick={() => openLightbox(i)}
            >
              <div className="w-full flex-grow bg-cover">
                <img className="w-20 h-20" src={image.link} alt={image.name} />
              </div>
              <div className="w-full">{image.name}</div>
            </div>
          ))}
      </div>

      {isOpen && (
        <div className="lightbox-overlay bg-gray-800 flex items-center justify-center" onClick={closeLightbox}>
          <div className="lightbox-container bg-gray-700 p-4 rounded shadow-lg text-white">
            <button className="close-button text-white" onClick={closeLightbox}>
              Close
            </button>
            <img
              className="lightbox-image mt-4"
              src={imageList[currentImageIndex].link}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
