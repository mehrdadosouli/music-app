import ButtonMusic from "~/utils/ButtonMusic";
import { formatDuration } from "~/utils/formatDuration";
import DotIcon from "./icons/DotIcon";
import HeartIcon from "./icons/HeartIcon";
import HeartIconFill from "./icons/HeartIconFill";
import { useSelector } from "react-redux";
import AddPlaylistIcon from "./icons/AddPlaylistIcon";

export default function TrackItem({ track, onToggle, isOpen, likeHandler,addHandler }) {
    const { myFavoritemusic = [] } = useSelector(state => state.songs);

    let findMusicLiked = Array.isArray(myFavoritemusic) && track && track.id
        ? myFavoritemusic.find(item => item && item.id === track.id)
        : undefined;

    if (!track || !track.id) {
        return null;
    }

    return (
        <div className="flex bg-bgcard rounded-md px-2 shadow-sm items-center ">
            <ButtonMusic bg={true} track={track} />
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
                    <span className="inline-flex cursor-pointer p-1 select-none" onClick={onToggle}><DotIcon /></span>
                    <div className={`${isOpen ? "flex flex-col gap-5" : "hidden"} absolute left-10 -top-2 select-none w-52 h-auto bg-bgbody p-2 rounded-lg`}>
                        <span className="flex justify-between gap-2 cursor-pointer" onClick={() => likeHandler(track)}>
                            اضافه کردن به علاقه ها {findMusicLiked ? <HeartIconFill /> : <HeartIcon />}
                        </span>
                        <span className="flex justify-between gap-2 cursor-pointer" onClick={() => addHandler(track)}>
                            اضافه کردن به لیست { <AddPlaylistIcon /> }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


