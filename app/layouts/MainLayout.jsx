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
import { useEffect, useState } from "react";

export default function MainLayout() {
  const [width, setWidth] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set initial width after component mounts
    setWidth(window.innerWidth)
    setIsLoaded(true)
    
    const handleResize = () => {
      setWidth(window.innerWidth);
      // فقط در موبایل toggle را reset کن
      if (window.innerWidth >= 1024) {
        setToggle(false)
      } else {
        // در موبایل همیشه بسته باشد
        setToggle(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      // در دسکتاپ همیشه sidebar باز باشد
      if (width >= 1024) {
        setToggle(true)
      } else {
        // در موبایل همیشه بسته باشد
        setToggle(false)
      }
    }
  }, [width, isLoaded])

  const MenuHandler = () => {
    setToggle(!toggle)
  }

  return (
    <div className="w-full px-10 relative flex">
      <div className="lg:w-[80%] w-full">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* همبرگر آیکون فقط در موبایل */}
      {isLoaded && width < 1024 && <img src="/photos/hamburgermenu.png" style={{ position: "fixed", top: "1%", left: "10%", width: "25px", height: "25px", margin: "1rem -1rem", zIndex: "100000", cursor: "pointer" }} onClick={MenuHandler} />}
      
      {/* Sidebar */}
      {isLoaded && (
        <aside className={`fixed top-10 flex flex-col gap-7 px-3 h-full z-50 bg-bgbody pe-5 ${
          width < 1024 
            ? (toggle ? "left-0 w-[20rem]" : "-left-[20rem]") + " transition-all duration-300 ease-in-out"
            : "left-0 w-[20%]"
        }`}>
          <h1 className="textstroke mx-auto mt-4 lg:text-4xl xl:text-5xl">OSOULI</h1>
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
      )}
    </div>
  );
}
