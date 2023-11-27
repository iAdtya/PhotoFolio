import React from 'react';
import { Navbar } from "./components/navbar";
// import { AlbumForm } from "./components/AlbumForm";
import { AlbumList } from "./components/AlbumList";


function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {/* <AlbumForm /> */}
      <AlbumList/>
    </div>
  );
}

export default App;
