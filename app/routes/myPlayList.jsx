import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPlaylistIcon from "~/components/icons/AddPlaylistIcon";
import PlayLists from "~/components/PlayLists";
import { loadplayList } from "~/redux/features/music/musicSlice";
import SwallPlayList from "~/utils/SwallPlayList.js";

export function meta() {
  return [
    { title: "صفحه ی پلی لیست" },
    { name: "پلی لیست", content: "خوش آمدید به صفحه ی پلی لیست" },
  ];
}
export default function myPlayList() {
  const { playList } = useSelector(state => state.songs)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadplayList())
  }, [])

  const clickHandler = () => {
    SwallPlayList(dispatch)
  }


  return (
    <div className="bgmylist lg:h-screen-minus-290 overflow-y-auto scrollbar-thin-custom pt-32 pb-8 px-8 relative">
      <button className="text-primarytxt hover:text-secondary" onClick={clickHandler}><AddPlaylistIcon /></button>
      <div>
        {Array.isArray(playList) && playList.length > 0 ?
          <div className="flex flex-col gap-5">
            <h1>پلی لیست من</h1>
            <PlayLists playlistitem={playList} />
          </div>
          :
          <h3 className="w-full mx-auto text-primarytxt mt-10">هیچ پلی لیستی ساخته نشده هنوز</h3>
        }
      </div>
    </div>
  )
}
