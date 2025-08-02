import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";
import TrendingSongs from "~/components/TrendingSongs";
import AllAlbum from "~/components/AllAlbum";
import UploadMusic from "~/components/UploadMusic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTracksUploaded } from "~/redux/features/music/musicSlice";
import ToastifyNotif from "~/utils/ToastifyNotif";

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
      console.log('🎉 آپلود موفق - به‌روزرسانی لیست');
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
      <UploadMusic />
      <button 
        onClick={async () => {
          try {
            console.log('🔍 Dispatch function available:', !!dispatch);
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
      
      {/* نمایش وضعیت */}
      {errorUploadTrack && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          خطا: {errorUploadTrack}
        </p>
      )}
      {uploadSuccess && (
        <p style={{ color: 'green', marginTop: '10px' }}>
          ✅ آپلود موفق!
        </p>
      )}
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
