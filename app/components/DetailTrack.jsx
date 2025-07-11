import { memo, useEffect, useState } from "react";
import { formatDuration } from "~/utils/formatDuration";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import ButtonMusic from "~/utils/ButtonMusic";
import { useDispatch, useSelector } from "react-redux";
import PlayerControll from "./PlayerControll/PlayerControll";
import { actionBtn, setPlayerVisibility } from "~/redux/features/music/musicSlice";

function DetailTrack({ track }) {
    const { isPlaying,isPlayerVisible } = useSelector((state) => state.songs);
    const dispatch = useDispatch()
    const words = track?.title?.split(" ") || [];
    const lastIndex = words.length > 0 ? words[words.length - 1] : "";
    const firstIndex = words.slice(0, words.length - 1).join(" ");
    const durations = track?.tracks?.map(item => item.duration) || [];
    const sumDurationMusics = durations.reduce((a, b) => a + b, 0);
    useEffect(() => {
        if (isPlaying) {
            setPlayerVisibility(true)
            setTimeout(() => {
                dispatch(actionBtn(false))
            }, 10);
        }
        if (!isPlayerVisible) {
            setTimeout(() => {
                dispatch(actionBtn(true))
            }, 10);
        }
    }, [isPlaying])
    return (
        <div className="flex flex-col ">
            <div className="flex gap-10 mt-36 " style={{ display: isPlayerVisible ? 'none' : undefined }}>
                <img src={track?.cover_url} className="md:size-72 size-44 rounded-xl shadow-black shadow-bottom object-cover" alt="" />
                <div className="flex flex-col justify-between gap-10">
                    <h1 className="text-primarytxt md:text-4xl text-2xl">
                        {firstIndex} <span className="text-primary md:text-4xl text-2xl">{lastIndex}</span>
                    </h1>
                    <span className="text-primarytxt text-sm md:flex hidden">{track?.description}</span>
                        <div className="flex justify-between items-center md:gap-10 gap-5">
                            <div className="flex gap-5">
                                <span className="text-primarytxt md:text-xl text-sm">{track?.tracks?.length || 0} اهنگ</span>
                                <span className="text-primarytxt md:text-xl text-sm">{formatDuration(sumDurationMusics)} دقیقه</span>
                            </div>
                            <ButtonMusic track={track.tracks[0]} />
                        </div>
                </div>
            </div>
            {isPlayerVisible ? <PlayerControll track={track} open={isPlayerVisible} />
            : <ListMusicOfAlbum tracks={track?.tracks} />}
        </div>
    );
}

export default memo(DetailTrack);
