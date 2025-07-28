import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import Menu from "~/components/Menu";
import SearchHeader from "~/components/SearchHeader";
import SearchIcon from "~/components/icons/SearchIcon";
import { setSearchTrack, setTheme, setTrackListMusic, toggleTheme } from "~/redux/features/music/musicSlice";
import { albums, tracks } from '~/data/mockData';
import ListMusicOfAlbum from "~/components/ListMusicOfAlbum";
import CloseBtn from "~/components/icons/CloseIcon";
import Toastify from "~/utils/Toastify";

function Header() {
  const { theme, track } = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(false);
  const [width, setWidth] = useState(null);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [background, setBackground] = useState(false);
  const [searchbox, setSearchbox] = useState(false);

  // مقدار سرچ رو از پارامتر URL بگیریم:
  const params = new URLSearchParams(search);
  const initialSearch = params.get("s") || "";

  const [searchs, setSearch] = useState(initialSearch);
  const [trackSearch, setTrackSearch] = useState([]);

  // فیلتر کردن ترک ها و آلبوم ها با توجه به سرچ
  const q = searchs.trim().toLowerCase();
  const trackResults = tracks.filter(t => t.artistName.toLowerCase().includes(q));
  const albumResults = albums.filter(t => t.artistName.toLowerCase().includes(q));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY > 50);
    };
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

  useEffect(() => {
    setBackground(pathname !== "/" && theme === "light");
  }, [pathname, theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // هر بار که مقدار searchs تغییر کرد، پارامتر URL رو بروز کن
  useEffect(() => {
    const newParams = new URLSearchParams(search);
    if (searchs.trim() !== "") {
      newParams.set("s", searchs.trim());
      dispatch(setSearchTrack(searchs))
    } else {
      newParams.delete("s");
      dispatch(setSearchTrack(""))
    }
    navigate({
      pathname: pathname,
      search: newParams.toString()
    }, { replace: true }); // replace:true تا تاریخچه مرورگر پر نشه
  }, [searchs, navigate, pathname, search]);

  const clickHandler = () => {
    dispatch(toggleTheme());
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    setSearchbox(true);
    if (searchs.trim()) {
      if (trackResults.length > 0 || albumResults.length > 0) {
        setTrackSearch(trackResults);
        dispatch(setTrackListMusic(trackResults));
      } else {
        Toastify("موردی پیدا نشد");
        setTrackSearch([]);
        dispatch(setTrackListMusic([]));
      }
    } else {
      setTrackSearch([]);
      dispatch(setTrackListMusic([]));
    }
  };

  useEffect(() => {
    if (!track?.length && trackResults.length > 0 && trackSearch.length > 0) {
      dispatch(setTrackListMusic(trackResults));
    }
  }, [track, trackResults, trackSearch, dispatch]);

  const closeHandler = () => {
    setTrackSearch([]);
    dispatch(setTrackListMusic([]));
    setSearch("");
    dispatch(setSearchTrack(""))
  };

  return (
    <div className={`lg:w-[75%] w-full flex justify-between items-center fixed ${background && 'bg-gray-200/50' } lg:top-10 top-6 lg:p-2 mx-10 rounded-full z-50 ${scrollY ? 'lg:backdrop-blur-xl' : ''}`}>
      <div className="lg:flex hidden gap-5">
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all" to="/signup">Sign Up</Link>
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-primary border border-primary hover:text-white hover:bg-primary transition-all" to="/login">Login</Link>
      </div>
      <Menu />
      {width && <SearchHeader searchClickHandler={searchClickHandler} search={searchs} setSearch={setSearch} width={width} /> }
      <div className="flex items-center gap-3">
        {width && width <= 1024 && <SearchIcon searchClickHandler={searchClickHandler} search={searchs} setSearch={setSearch} width={width} />}
        <button className='text-primarytxt' onClick={clickHandler}>
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          )}
        </button>
      </div>
      <div className={`${trackSearch.length ? "fixed" : "hidden"} top-32 w-[85%]  h-96 overflow-y-scroll bg-bgplayercontroll z-[999999999]`}>
        {trackSearch.length ? (
          <div>
            <span className="p-2 inline-flex rounded-full bg-bgplayercontroll fixed top-28 right-8" onClick={closeHandler}><CloseBtn /></span>
            <ListMusicOfAlbum tracks={trackSearch} />
          </div>
        ) : ""}
      </div>
    </div>
  );
}

export default Header;
