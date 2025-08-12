import { useDispatch, useSelector } from "react-redux";
import CloseBtn from "../icons/CloseIcon";
import MinusIcon from "../icons/MinusIcon";
import { actionBtn, pauseAudio, setMinustMusic, setPlayerVisibility, setTrackListMusic } from "~/redux/features/music/musicSlice";

export default function PlayerControllNavbar({ track }) {
  const dispatch = useDispatch()
  const { currentPlaylist, track: reduxTrack } = useSelector((state) => state.songs);
  
  // اولویت: currentPlaylist > reduxTrack > track prop
  const displayTrack = currentPlaylist || reduxTrack || track;
  
  const buttonHandler = () => {
    dispatch(actionBtn(true))
    dispatch(pauseAudio())
    // حذف dispatch(setTrackListMusic([])) تا لیست موسیقی حفظ شود
    dispatch(setPlayerVisibility(false))
    document.body.classList.remove('noScroll');
  }
  const minusHandle = () => {
    dispatch(setMinustMusic(true))
    document.body.classList.remove('noScroll');
  }
  return (
    <div className="fixed left-5 right-5 mx-auto flex justify-between items-center p-5 z-[103] rounded-2xl bg-black">
      <div className="flex gap-3 ">
        <CloseBtn buttonHandler={buttonHandler} />
        <MinusIcon minusHandle={minusHandle} />
      </div>
      <span className="text-primarytxt text-white">Next Playing ({displayTrack?.tracks?.length || displayTrack?.length || 0}) </span>
    </div>
  )
}
