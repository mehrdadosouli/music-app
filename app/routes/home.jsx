import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";
import TrendingSongs from "~/components/TrendingSongs";

export function meta() {
  return [
    { title: "صفحه ی موزیک " },
    { name: "description", content: "صفحه مورد نظر پیدا نشد" },
  ];
}

export default function Home() {
    
  return (
    <>
      <Banner />
      <TopSongs title="بهترین موزیک هفته" />
      <TopSongs title="بهترین موزیک ماه" />
      <TrendingSongs title="موزیک های معروف" />
    </>
  );
}
