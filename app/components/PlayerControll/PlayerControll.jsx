import ListMusicOfAlbum from "../ListMusicOfAlbum";
import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({ track, open,setIsPlayeVisible }) { 

  return (
    <div className={`${open ? 'playerControllOpen' : 'playerControllClose'} px-10 z-[1000] bg-bgplayercontroll`}>
      <PlayerControllNavbar track={track} setIsPlayeVisible={setIsPlayeVisible} />
      {track ? <ListMusicOfAlbum tracks={track?.tracks} page="playcontroll" /> : <p>داده موجود نیست</p>}
    </div>
  )
}
