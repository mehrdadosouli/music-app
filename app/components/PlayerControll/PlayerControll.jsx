import ListMusicOfAlbum from "../ListMusicOfAlbum";
import MusicControll from "./MusicControll";
import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({ track, open }) {
  

  return (
    <div className={`${open ? 'playerControllOpen md:pb-28' : 'playerControllClose'} px-5 z-[1000] bg-bgplayercontroll overflow-y-auto`}>
      <PlayerControllNavbar track={track} />
      {track ? <ListMusicOfAlbum tracks={track.tracks ? track.tracks : track} page="playcontroll" /> : <p>داده موجود نیست</p>}
       <MusicControll />
    </div>
  )
}
