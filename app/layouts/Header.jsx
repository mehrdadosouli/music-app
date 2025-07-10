import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router"
import Menu from "~/components/Menu"
import SearchHeader from "~/components/SearchHeader"
import SearchIcon from "~/components/icons/SearchIcon"
import { setTheme, toggleTheme } from "~/redux/features/music/musicSlice";

function Header() {
  const theme = useSelector(state => state.songs.theme);
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(false)
  const [width, setWidth] = useState(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    dispatch(setTheme(currentTheme));
  }, [dispatch]);

  // به محض تغییر تم، صدا زدن این useEffect برای هماهنگی DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const clickHandler = () => {
    dispatch(toggleTheme());
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    // اینجا می‌توانید جستجو رو انجام بدید
  };

  return (
    <div className={`lg:w-[75%] w-full flex justify-between items-center fixed lg:top-10 top-6 lg:p-2 mx-10 rounded-full z-50 ${scrollY && 'lg:backdrop-blur-xl'}`}>
      <div className="lg:flex hidden gap-5">
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all" to="/signup">Sign Up</Link>
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-primary border border-primary hover:text-white hover:bg-primary transition-all" to="/login">Login</Link>
      </div>
      <Menu className="hidden lg:flex" />
      <SearchHeader />
      <div className="flex items-center gap-3">
        {width <= 1024 && <SearchIcon clickHandler={searchClickHandler} />}
        <button className='text-primarytxt' onClick={clickHandler}>{theme == "light" ? 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        }</button>
      </div>
    </div>
  )
}

export default Header