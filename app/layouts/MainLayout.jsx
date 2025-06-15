import Header from "./Header";
import Footer from "./Footer";
import { Link, Outlet } from "react-router";
import HomeIcon from "~/components/icons/HomeIcon";
import LibraryIcon from "~/components/icons/LibraryIcon";
import LogOutIcon from "~/components/icons/LogOutIcon";
import AddPlaylistIcon from "~/components/icons/AddPlaylistIcon";
import HeartIcon from "~/components/icons/HeartIcon";
import SignIcon from "~/components/icons/SignIcon";
import ListIcon from "~/components/icons/ListIcon";

export default function MainLayout() {
  return (
    <div className="container relative flex pt-10">
      <div className="w-5/6">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
      <aside className="w-1/6 flex flex-col items-end gap-5">
        <h1 className="textstroke">OSOULI</h1>
        <span className="text-primary text-sm">منو</span>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <HomeIcon />
          خانه
        </Link>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <ListIcon />
          آلبوم ها
        </Link>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <SignIcon />
          خواننده ها
        </Link>
        <span className="text-primary text-sm">پلی لیست و مورد علاقه ها</span>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <HeartIcon />
          مورد علاقه های من
        </Link>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <LibraryIcon />
          پلی لیست من
        </Link>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <AddPlaylistIcon />
          اظافه کردن پلی لیست
        </Link>
        <span className="text-primary text-sm">عمومی</span>
        <Link to="/" className="flex flex-row-reverse items-center gap-2 text-primarytxt hover:text-secondary">
          <LogOutIcon />
          خروج از حساب کاربری
        </Link>
      </aside>
    </div>
  );
}
