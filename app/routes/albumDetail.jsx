import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import DetailTrack from "~/components/DetailTrack";
import { fetchAlbumDetail, setTrackListMusic } from "~/redux/features/music/musicSlice";


export function meta() {
  return [
    { title: "صفحه ی البوم " },
    { name: "موزیک", content: "خوش آمدید به صفحه موزیک" },
  ];
}

export default function albumDetail() {
  const { trackError, trackLoading, albumDetail,track } = useSelector(state => state.songs)
  const { trackId } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    if (trackId) dispatch(fetchAlbumDetail(trackId));
  }, [dispatch, trackId])

  useEffect(() => {
    dispatch(fetchAlbumDetail(trackId));
  }, [])


useEffect(() => {
  if(!track?.length){
    dispatch(setTrackListMusic(albumDetail));    
  }
}, [albumDetail, dispatch,track]);

  if (trackLoading) { return (<h1>IsLoading.....</h1>) }
  if (trackError) return <p>خطا: {trackError}</p>;
  return (<>
    <div className="flex flex-col">
      {albumDetail ? <DetailTrack /> : <p>داده موجود نیست</p>}
    </div>
  </>);
}
