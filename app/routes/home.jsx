import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";
import TrendingSongs from "~/components/TrendingSongs";
import AllAlbum from "~/components/AllAlbum";
import UploadMusic from "~/components/UploadMusic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTracksUploaded } from "~/redux/features/music/musicSlice";

export function meta() {
  return [
    { title: "صفحه ی موزیک" },
    { name: "description", content: "صفحه مورد نظر پیدا نشد" },
  ];
}

export default function Home() {
  const dispatch = useDispatch();
  const { FetchTrackUpload } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchAllTracksUploaded());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <TopSongs title="بهترین موزیک هفته" />
      <TopSongs title="بهترین موزیک ماه" />
      <TrendingSongs title="موزیک های معروف" />
      <AllAlbum title="البوم ها" />
      <UploadMusic />
      <div>
        <h2>موزیک‌های شما</h2>
        {FetchTrackUpload && FetchTrackUpload.length > 0 ? (
          <ul>
            {FetchTrackUpload.map((track) => (
              <li key={track.id} style={{ marginBottom: 12 }}>
                <strong>{track.title || "بدون نام"}</strong> - {track.artist || "ناشناخته"}
                <br />
                <audio controls src={track.audio_url} style={{ marginTop: 6, width: "100%" }} />
              </li>
            ))}
          </ul>
        ) : (
          <p>هیچ موزیکی یافت نشد.</p>
        )}
      </div>
    </>
  );
}
