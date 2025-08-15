import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ListMusicOfAlbum from "../ListMusicOfAlbum";
import MusicControll from "./MusicControll";
import PlayerControllNavbar from "./PlayerControllNavbar";
import { restoreCurrentPlaylist } from "~/redux/features/music/musicSlice";


export default function PlayerControll({ track, open }) {
  const dispatch = useDispatch();
  const { minusMusic, currentPlaylist, track: reduxTrack } = useSelector((state) => state.songs);

  // اولویت: currentPlaylist > reduxTrack > track prop
  const displayTrack = currentPlaylist || reduxTrack || track;
  
  // برای debug
  console.log("PlayerControll - currentPlaylist:", currentPlaylist);
  console.log("PlayerControll - reduxTrack:", reduxTrack);
  console.log("PlayerControll - track prop:", track);
  console.log("PlayerControll - displayTrack:", displayTrack);
  
  // وقتی پلیر باز می‌شود، لیست موسیقی فعلی را بازیابی کن
  useEffect(() => {
    if (open && !minusMusic && currentPlaylist && !reduxTrack) {
      console.log("Restoring current playlist in PlayerControll");
      dispatch(restoreCurrentPlaylist());
    }
  }, [open, minusMusic, currentPlaylist, reduxTrack, dispatch]);

  return (
    <div className={`${!minusMusic && (open ? 'playerControllOpen md:pb-28' : 'playerControllClose')} px-5 z-[100] bg-bgplayercontroll overflow-y-auto`}>
      {!minusMusic && <PlayerControllNavbar track={displayTrack} />}
      <MusicControll />
      {!minusMusic && (displayTrack ? <ListMusicOfAlbum tracks={displayTrack.tracks ? displayTrack.tracks : displayTrack} page="playcontroll" /> : <p>داده موجود نیست</p>)}
    </div>
  )
}
