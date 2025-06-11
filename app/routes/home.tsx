import Banner from "~/layouts/Banner";
import type { Route } from "./+types/home";
import TopSongs from "~/components/TopSongs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "صفحه ی خانه" },
    { name: "خانه", content: "خوش آمدید به خانه" },
  ];
}

export default function Home() {
  return (<>
    <Banner />
    <TopSongs title="بهترین موزیک هفته" />  
  </>);
}
