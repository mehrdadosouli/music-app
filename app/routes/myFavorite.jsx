import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import ListMusicOfAlbum from "~/components/ListMusicOfAlbum";
import { setTrackListMusic } from "~/redux/features/music/musicSlice";

export function meta() {
  return [
    { title: " صفحه ی موزیک های من" },
    { name: "myFavorite", content: "صفحه ی موزیک های من" },
  ];
}

export default function myFavorite() {
  const dispatch = useDispatch();
  const { myFavoritemusic, isPlayerVisible, searchTrack } = useSelector(state => state.songs)
  const { pathname } = useLocation()
  useEffect(() => {
    if (myFavoritemusic && myFavoritemusic.length > 0 && pathname === "/myfavorite" && isPlayerVisible && searchTrack == "") {
      dispatch(setTrackListMusic({ tracks: myFavoritemusic }));
    } else {
      dispatch(setTrackListMusic([]));
    }

  }, [myFavoritemusic, pathname, dispatch, isPlayerVisible, searchTrack]);

  return (
    <div className="mt-12 md:mt-28">
      {
        myFavoritemusic.length ?
          <div><ListMusicOfAlbum tracks={myFavoritemusic} /></div> :
          <div>
            <h2>هیچ موزیک دلخواهی هنوز انتخاب نشده</h2>
          </div>
      }
    </div>
  )
}
