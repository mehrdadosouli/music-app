import Banner from "~/layouts/Banner";
import TopSongs from "~/components/TopSongs";

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
    </>
  );
}
