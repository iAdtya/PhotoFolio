import { useEffect, useState } from "react";

import { AlbumForm } from "./AlbumForm";
import { Album } from "./Album";

import { db } from "../firebase-Init";
import { collection, onSnapshot } from "firebase/firestore";
import { ImageList } from "./ImageList";

export function AlbumList() {
  const [albumList, setAlbumList] = useState([]);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

  useEffect(() => {
    // getting realtime updates from database
    const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
      const card = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(card);
      // storing all the albums within local state variable
      setAlbumList(card);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        {!openAlbum.open ? (
          <>
            <div className="mb-4">{showAlbumForm && <AlbumForm />}</div>

            <div className="text-center">
              <span className="text-lg font-bold text-white">Your Albums</span>
              <button
                className="ml-4 py-2 px-4 bg-white text-black rounded"
                onClick={() => setShowAlbumForm(!showAlbumForm)}
              >
                {!showAlbumForm ? "Create Album" : "Cancel"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4">
              {albumList.map((card, i) => (
                <Album key={i} info={card} setOpenAlbum={setOpenAlbum} />
              ))}
            </div>
          </>
        ) : <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />}
      </div>
    </>
  );
}
