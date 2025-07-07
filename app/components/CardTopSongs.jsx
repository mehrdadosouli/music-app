import { Link } from "react-router";

export default function CardTopSongs({ song }) {
    return (
        <Link to={`/album/${song.albumId}`} className="flex flex-col bg-bgcard rounded-xl gap-3 overflow-hidden hover:shadow-lg z-20 transition-all duration-300 hover:scale-105">
            <div className=" w-full aspect-square">
                <img 
                    src={`/backend/public/photos/${song.artistName}.jpg`} 
                    alt={song.title} 
                    className="w-full h-full object-cover rounded-t-xl" 
                />
                <div className=" inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-all duration-300"></div>
            </div>
            <div className="p-4">
                <h3 className="text-primarytxt font-semibold text-lg mb-1 truncate">{song.title}</h3>
                <p className="text-primarytxt text-sm opacity-80 line-clamp-2">{song.lyrics}</p>
            </div>
        </Link>
    )
}
