import { useDispatch } from "react-redux";
import CloseBtn from "../icons/CloseIcon";
import MinusIcon from "../icons/MinusIcon";
import { actionBtn, pauseAudio, setPlayerVisibility } from "~/redux/features/music/musicSlice";

export default function PlayerControllNavbar({ track }) {
  const dispatch = useDispatch()
  const buttonHandler = () => {
    dispatch(actionBtn(true))
    dispatch(pauseAudio())
    setTimeout(() => {
      dispatch(setPlayerVisibility(false))
    }, 10);
  }
  return (
    <div className="flex justify-between items-center p-5 rounded-2xl bg-black">
      <div className="flex gap-3 ">
        <CloseBtn buttonHandler={buttonHandler} />
        <MinusIcon />
      </div>
      <span className="text-primarytxt text-white">Next Playing ({track?.tracks?.length}) </span>
    </div>
  )
}
