import ButtonMusic from "~/utils/ButtonMusic";
import { formatDuration } from "~/utils/formatDuration";

export default function TrackItem({track}) {
    console.log(track);
    
  return (
    <div className="flex bg-bgcard rounded-md px-2 shadow-sm">
        <img src="" alt="" />
        <ButtonMusic bg={true} track={track.id} />
        <div className="w-full [&>*]:text-red-300 flex justify-between items-center">
            <img src={`/backend/public/photos/${track.artistName}.jpg`} className="size-12" alt="" />
            <div className="flex flex-col gap-2">
                <h5>{track.title}</h5>
                <h5>{track.style}</h5>
            </div>
                <h5>{track.release_date}</h5>
                <h5>{track.albumTitle}</h5>
            <div>

                <h5>{formatDuration(track.duration)}</h5>
            </div>
        </div>
    </div>
  )
}
