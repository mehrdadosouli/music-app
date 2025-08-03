import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";
import TrendingSongs from "~/components/TrendingSongs";
import AllAlbum from "~/components/AllAlbum";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTracksUploaded } from "~/redux/features/music/musicSlice";
import ToastifyNotif from "~/utils/ToastifyNotif.js";
import AllTracksAlbum from "~/components/AllTracksAlbum";

export function meta() {
  return [
    { title: "صفحه ی موزیک" },
    { name: "description", content: "صفحه مورد نظر پیدا نشد" },
  ];
}

export default function Home() {
  const dispatch = useDispatch();
  const { FetchTrackUpload, isLoadingUploadTrack, uploadSuccess, errorUploadTrack } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchAllTracksUploaded());
  }, [dispatch]);

  // بعد از آپلود موفق، لیست را به‌روزرسانی کن
  useEffect(() => {
    if (uploadSuccess) {
      dispatch(fetchAllTracksUploaded());
    }
  }, [uploadSuccess, dispatch]);

  // نمایش خطاهای آپلود
  useEffect(() => {
    if (errorUploadTrack) {
      console.error('❌ خطای آپلود:', errorUploadTrack);
    }
  }, [errorUploadTrack]);

  return (
    <>
      <Banner />
      <TopSongs title="بهترین موزیک هفته" />
      <TopSongs title="بهترین موزیک ماه" />
      <TrendingSongs title="موزیک های معروف" />
      <AllAlbum title="البوم ها" />
      <AllTracksAlbum title="آهنگ های آپلود شده"/>
      <button 
        onClick={async () => {
          try {
            await ToastifyNotif(dispatch);
          } catch (error) {
            console.error('خطا:', error);
          }
        }}
        disabled={isLoadingUploadTrack}
        style={{
          backgroundColor: isLoadingUploadTrack ? '#ccc' : '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoadingUploadTrack ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        {isLoadingUploadTrack ? "در حال آپلود..." : "آپلود موسیقی"}
      </button>
    </>
  );
}
