import { Link } from "react-router";

export default function Banner() {
    return (
        <div className="w-full banner flex flex-col justify-center items-end pl-10 gap-5">
            <h4 className="text-white text-5xl">All the <span className="text-primary">Best Songs</span></h4>
            <h4 className="text-white text-5xl"> in One Place</h4>
            <p className="w-[32rem] text-left text-sm text-white">On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!</p>
            <div className="flex gap-5">
                <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all" to="/signup">Discover Now</Link>
                <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-secondary border border-secondary hover:text-white hover:bg-secondary transition-all" to="/login">Create Playlist</Link>
            </div>
        </div>
    )
}
