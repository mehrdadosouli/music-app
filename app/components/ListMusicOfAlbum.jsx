import TrackItem from "./TrackItem";


export default function ListMusicOfAlbum({ tracks }) {
    return (
        <div className="flex flex-col gap-5 p-2 my-10">
            <div className="grid grid-cols-4 text-primarytxt ">
                <span className="col-span-2 justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks.map((item) => <TrackItem key={item.id} track={item} />)}
        </div>
    )
}
