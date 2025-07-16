import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";
import TrendingSongs from "~/components/TrendingSongs";
import { useSelector } from "react-redux";
import PlayerControll from "~/components/PlayerControll/PlayerControll";

export function meta() {
  return [
    { title: "صفحه ی موزیک " },
    { name: "description", content: "صفحه مورد نظر پیدا نشد" },
  ];
}

export default function Home() {
    const { isPlaying, track ,isPlayerVisible } = useSelector((state) => state.songs);

  return (
    <>
      {isPlayerVisible ? <PlayerControll track={track} open={isPlayerVisible} />  : <p>داده موجود نیست</p>}
      <Banner />
      <TopSongs title="بهترین موزیک هفته" />
      <TopSongs title="بهترین موزیک ماه" />
      <TrendingSongs title="موزیک های معروف" />
    </>
  );
}
