import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPlaylistIcon from "~/components/icons/AddPlaylistIcon";
import TrashIcon from "~/components/icons/TrashIcon";
import { loadplayList } from "~/redux/features/music/musicSlice";
import SwallDelete from "~/utils/SwallDelete";
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
  const removeHandler = (item) => {
    SwallDelete(dispatch, item)
  }
  const onToggle = (item) => {
    SwallDelete(dispatch, item)
  }
  return (
    <div className="bgmylist lg:h-screen-minus-290 h-screen pt-32 px-5 relative">
      <button className="text-primarytxt hover:text-secondary" onClick={clickHandler}><AddPlaylistIcon /></button>
      <div>

        {Array.isArray(playList) && playList.length > 0 ?
          <div className="flex flex-col gap-5">
            <h1>پلی لیست من</h1>
            {
              playList.map(item =>
                <div className="flex items-center gap-10 w-full bg-[#e7e7e7] p-4 rounded-xl">
                  <div className=" cursor-pointer p-1 select-none" onClick={() => onToggle(item)}>
                    <TrashIcon />
                  </div>
                  <span key={item.id} onClick={() => removeHandler(item)}>{item.name}</span>
                </div>)
            }
          </div>
          :
          <h3 className="w-full mx-auto text-primarytxt mt-10">هیچ پلی لیستی ساخته نشده هنوز</h3>
        }
      </div>
    </div>
  )
}
