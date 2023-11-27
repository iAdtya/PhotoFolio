export function Image(props) {
  const { image, index, openLightbox, handleImageEdit , handleImageDelete } = props;

  return (
    <>
      <div className="h-56 w-48 flex flex-col bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-md m-4 shadow-md hover:from-blue-400 hover:to-purple-400">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image.link})` }} onClick={() => openLightbox(index)}>
          <img className="w-full h-full object-fill" src={image.link} alt="" />
        </div>
        <div className="w-full h-6 text-white flex justify-between items-center">
          {image.name}
          <div>
            <button className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded-md" onClick={()=>handleImageEdit(image)}>Edit</button>
            <button className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md" onClick={()=>handleImageDelete(image)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
