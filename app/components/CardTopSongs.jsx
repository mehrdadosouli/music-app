import { Link } from "react-router";


export default function CardTopSongs({ song }) {

    return (
        <Link to={`/album/${song.albumId}`} className="flex flex-col justify-end px-5 py-4 bg-bgcard rounded-xl gap-2">
            <img src={song.cover_url} alt={song.title} className="size-56 object-cover rounded-xl" />
            <span className="text-primarytxt">{song.title}</span>
            <span className="text-primarytxt">{song.lyrics}</span>
        </Link>
    )
}
