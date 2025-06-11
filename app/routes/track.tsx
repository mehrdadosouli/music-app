import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import DetailTrack from "~/components/DetailTrack";
import { fetchTrackById } from "~/redux/features/music/musicSlice";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "صفحه ی موزیک " },
    { name: "موزیک", content: "خوش آمدید به صفحه موزیک" },
  ];
}

export default function Track() {
  const {trackError,trackLoading,track}= useSelector(state => state.songs)
  const { trackId } = useParams();

  const dispatch=useDispatch()
  useEffect(()=>{
    if (trackId) dispatch(fetchTrackById(trackId));
  },[dispatch,trackId])
  
  if (trackLoading) { return (<h1>IsLoading.....</h1>) }
  if (trackError) return <p>خطا: {trackError}</p>;
  return (<>
    <div className="flex flex-col">
        <DetailTrack track={track} />
        <div></div>
    </div>  
  </>);
}
 