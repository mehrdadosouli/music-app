import ButtonMusic from "~/utils/ButtonMusic";
import { formatDuration } from "~/utils/formatDuration";
import DotIcon from "./icons/DotIcon";
import HeartIcon from "./icons/HeartIcon";
import HeartIconFill from "./icons/HeartIconFill";
import { useSelector } from "react-redux";

export default function TrackItem({ track, onToggle, isOpen, likeHandler }) {
    const { myFavoritemusic } = useSelector(state => state.songs)
    let findMusicLiked=myFavoritemusic.find(item=>item.id == track.id)
    return (
        <div className="flex bg-bgcard rounded-md px-2 shadow-sm items-center ">
            {track && <ButtonMusic bg={true} track={track} />}
            <div className="flex w-full items-center justify-between [&>*]:text-primarytxt">
                <div className="flex items-center">
                    <img src={`/photos/${track.artistName ? track.artistName : `trackBg`}.jpg`} className="size-12 bg-white object-cover mr-2" alt="" />
                    <div className="flex flex-col gap-1 mr-5">
                        <h5 className="[&>*]:text-primarytxt">{track?.title}</h5>
                        <h5 className="[&>*]:text-primarytxt">{track?.albumTitle}</h5>
                    </div>
                </div>
                <h5 className="md:flex hidden">{track?.release_date}</h5>
                <h5 className="md:flex hidden">{track?.style}</h5>
                <div className="flex items-center relative">
                    <h5 className="text-primarytxt">{formatDuration(track?.duration)}</h5>
                    <span className="inline-flex cursor-pointer p-1 select-none" onClick={onToggle} ><DotIcon /></span>
                    <div className={`${isOpen ? "flex" : "hidden"} absolute left-10 -top-2 select-none w-48 h-12 flex justify-center items-center bg-bgbody p-2 rounded-lg`}>
                        <span className="flex gap-2 cursor-pointer" onClick={() => likeHandler(track)} >اظافه کردن به لیست {findMusicLiked ? <HeartIconFill /> : <HeartIcon />}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

