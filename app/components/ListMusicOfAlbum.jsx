import TrackItem from "./TrackItem";
export default function ListMusicOfAlbum({ tracks }) {
         
    return (
        <div className={`w-full flex flex-col gap-10 p-2 my-10 mb-28 flex-1`}>
            <div className="grid md:grid-cols-4 grid-cols-1 text-white ">
                <span className="col-span-2 md:flex hidden justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end md:flex hidden">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks && tracks?.map((item) => <TrackItem key={item.id} track={item} />)}
        </div>

    )
}
