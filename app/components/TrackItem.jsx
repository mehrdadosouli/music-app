import ButtonMusic from "~/utils/ButtonMusic";
import { formatDuration } from "~/utils/formatDuration";

export default function TrackItem({ track }) {    
    return (
        <div className="flex bg-bgcard rounded-md px-2 shadow-sm items-center ">
            {track && <ButtonMusic bg={true} track={track} />}
            <div className="flex w-full items-center justify-between [&>*]:text-primarytxt"> {/* تغییرات در این قسمت */}
                <div className="flex items-center"> {/* Container برای عکس و اطلاعات ترک */}
                    <img src={`/photos/${track.artistName}.jpg`} className="size-12 object-cover mr-2" alt="" /> {/* اضافه کردن margin-right */}
                    <div className="flex flex-col gap-1 mr-5"> {/* تغییر gap به gap-1 */}
                        <h5 className="[&>*]:text-primarytxt">{track.title}</h5>
                        <h5 className="[&>*]:text-primarytxt">{track.albumTitle}</h5> {/* نمایش اسم آلبوم */}
                    </div>
                </div>
                <h5 className="md:flex hidden">{track.release_date}</h5> {/* اضافه کردن margin-right */}
                <h5 className="md:flex hidden">{track.style}</h5> {/* نمایش سبک */}
                <h5 className="[&>*]:text-primarytxt">{formatDuration(track.duration)}</h5>
            </div>
        </div>
    )
}
