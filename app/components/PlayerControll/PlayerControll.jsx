import ListMusicOfAlbum from "../ListMusicOfAlbum";
import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({track}) {
  return (
    <div className="size-full absolute top-0 left-0 right-0 z-[1000] bg-bgplayercontroll">
        <PlayerControllNavbar track={track} />
        {track ? <ListMusicOfAlbum tracks={track?.tracks} page="playcontroll" /> : <p>داده موجود نیست</p>}
    </div>
  )
}
