import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllAlbum from "~/components/AllAlbum";
import TrendingSongs from "~/components/TrendingSongs";
import { fetchBestSongs } from "~/redux/features/music/musicSlice";

export function meta() {
    return [
        { title: "صفحه ی خواننده ها" },
        { name: "موزیک", content: "خوش آمدید به صفحه خواننده ها" },
    ];
}

export default function Artist() {
    const dispatch = useDispatch();
    const { track } = useSelector(state => state.songs);
    console.log(track);

    useEffect(() => {
        dispatch(fetchBestSongs());
    }, [dispatch]);


    return (
        <div className="mt-28">
            <TrendingSongs title="موزیک های معروف" />
            <AllAlbum title="پیشنهاد ها" />
        </div>
    );
}
