import { ReactComponent as AlbumCover } from "../assets/album-svgrepo-com.svg";
export function Album(props) {
  var { info, setOpenAlbum } = props;
  function handleClick(e) {
    setOpenAlbum({ albumId: info.id, open: true });
  }
  return (
    <div
      className="w-44 h-44 flex flex-col m-2 rounded overflow-hidden shadow-md bg-gray-700 p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-500"
      onClick={handleClick}
    >
      <div className="w-full flex-grow bg-cover">
        <AlbumCover className="w-20 h-20" />
      </div>
      <div className="w-full">{info.Albumname}</div>
    </div>
  );
}
