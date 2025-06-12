import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router"
import Menu from "~/components/Menu"
import SearchHeader from "~/components/SearchHeader"
import { setTheme, toggleTheme } from "~/redux/features/music/musicSlice";

function Header() {
  const theme = useSelector(state => state.songs.theme);
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(false)
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
  return (
    <div className={`flex justify-between items-center fixed top-10 p-2 rounded-full overflow-hidden ${scrollY && 'backdrop-blur-xl'}`}>
      <div className="flex gap-5">
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all" to="/signup">Sign Up</Link>
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-primary border border-primary hover:text-white hover:bg-primary transition-all" to="/login">Login</Link>
      </div>
      <Menu />
      <SearchHeader />
      <button className='text-primarytxt' onClick={clickHandler}>{theme == "light" ? 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      }</button>
    </div>
  )
}

export default Header