import CloseBtn from "../icons/CloseIcon";
import MinusIcon from "../icons/MinusIcon";


export default function PlayerControllNavbar({track}) {
  
  return (
    <div className="flex justify-between items-center p-5 fixed top-0 left-0 right-0 bg-black">
      <div className="flex gap-3 ">
        <CloseBtn />
        <MinusIcon />
      </div>
      <span className="text-primarytxt text-white">Next Playing ({track?.tracks?.length}) </span>
    </div>
  )
}
