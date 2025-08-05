import { useSelector } from "react-redux";
import ListMusicOfAlbum from "../ListMusicOfAlbum";
import MusicControll from "./MusicControll";
import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({ track, open }) {
  const { minusMusic } = useSelector((state) => state.songs);

  return (
    <div className={`${!minusMusic && (open ? 'playerControllOpen md:pb-28' : 'playerControllClose')} px-5 z-[100] bg-bgplayercontroll overflow-y-auto`}>
      {!minusMusic && <PlayerControllNavbar track={track} />}
      <MusicControll />
      {!minusMusic && (track ? <ListMusicOfAlbum tracks={track.tracks ? track.tracks : track} page="playcontroll" /> : <p>داده موجود نیست</p>)}
    </div>
  )
}
