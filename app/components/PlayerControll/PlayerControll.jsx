import ListMusicOfAlbum from "../ListMusicOfAlbum";
import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({track,open}) {
  return (
    <div className={`${open ? 'playerControllOpen' : 'playerControllClose'} z-[1000] bg-bgplayercontroll`}>
        <PlayerControllNavbar track={track} />
        {track ? <ListMusicOfAlbum tracks={track?.tracks} page="playcontroll" /> : <p>داده موجود نیست</p>}
    </div>
  )
}
