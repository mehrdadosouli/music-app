import TrackItem from "./TrackItem";


export default function ListMusicOfAlbum({ tracks , page="" }) {
    return (
        <div className={`w-full flex flex-col gap-5 p-2 my-10 ${page && "absolute left-0 right-0 top-0 bg-bgplayercontrollCard"}`}>
            <div className="grid grid-cols-4 text-primarytxt ">
                <span className="col-span-2 justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks.map((item) => <TrackItem key={item.id} track={item} />)}
        </div>
    )
}
