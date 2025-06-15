import PlayerControllNavbar from "./PlayerControllNavbar";


export default function PlayerControll({track}) {
  return (
    <div className="w-full absolute top-0 left-0 right-0 bg-black">
        <PlayerControllNavbar track={track} />
    </div>
  )
}
