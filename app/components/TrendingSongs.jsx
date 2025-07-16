import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useSelector } from "react-redux";

export default function TrendingSongs({ title }) {
    const select = useSelector(state => state.songs.topSongs)
    const titleArray=title.split(" ");
    const lastChar=titleArray[titleArray.length - 1]
    
    return (
        <div>
            <h2 className="py-2 text-primarytxt text-3xl">{titleArray.slice(0,-1).join(" ")} <span className="text-primary">{lastChar}</span></h2>
            <ListMusicOfAlbum tracks={select} />
        </div>
    )
}
