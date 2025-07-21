import { Link } from "react-router";

export default function CardSongs({ song, h = "15rem", w = "18rem", rounded = "0", bg = "bgcard", txt = "start" }) {
    return (
        <Link to={`/album/${song.albumId}`} className={`flex flex-col bg-${bg} gap-3 hover:shadow-lg transition-all duration-300 hover:scale-105 z-0`}>
            <div className=" w-full flex items-center justify-center">
                <img src={`/photos/${song.artistName}.jpg`} alt={song.title} className={`w-full rounded-${rounded} object-cover`} style={{ height: h, width: w }} />
                <div className=" inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-all duration-300"></div>
            </div>
            <div className={`p-4 h-28 text-${txt}`}>
                <h3 className="text-primarytxt font-semibold text-lg mb-1 truncate">{song.artistName}</h3>
                <p className="text-primarytxt text-sm opacity-80 line-clamp-2">{song.title}</p>
            </div>
        </Link>
    )
}
