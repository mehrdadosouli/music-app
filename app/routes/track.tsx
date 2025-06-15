import type { Route } from "./+types/home";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import DetailTrack from "~/components/DetailTrack";
import PlayerControll from "~/components/PlayerControll/PlayerControll";
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

  ///////// music play handler
  // const playMusicHandler=useCallback(()=>{

  // },[])
  
  if (trackLoading) { return (<h1>IsLoading.....</h1>) }
  if (trackError) return <p>خطا: {trackError}</p>;
  return (<>
    <div className="flex flex-col">
      <PlayerControll track={track} />
        {track ? <DetailTrack track={track} /> : <p>داده موجود نیست</p>}
        <div></div>
    </div>  
  </>);
}
 