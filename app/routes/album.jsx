// albums.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSongs from "~/components/CardSongs";
import { fetchAllAlbum } from "~/redux/features/music/musicSlice";

export function meta() {
  return [
    { title: "صفحه ی آلبوم‌ها" },
    { name: "موزیک", content: "خوش آمدید به صفحه آلبوم‌ها" },
  ];
}

export default function Albums() {
  const { allAlbum } = useSelector(state => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAlbum());
  }, [dispatch]);


  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 my-32 ">
      {allAlbum ? (
        allAlbum.map(album => (
          <div key={album.id} className="keen-slider__slide overflow-hidden rounded-xl ">
            <CardSongs song={album} />
          </div>
        ))
      ) : (
        <p>داده موجود نیست</p>
      )}
    </div>
  );
}
