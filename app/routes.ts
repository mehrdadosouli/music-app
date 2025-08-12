import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),  // صفحه اصلی
  route("*", "routes/404.jsx"),  // صفحه خطای 404
  route("/myPlayList", "routes/myPlayList.jsx"),  // صفحه پلی لیست من 
  route("/myPlayList/:listId", "routes/myPlayListDetail.jsx"),  // صفحه پلی لیست من 
  route("/myFavorite", "routes/myFavorite.jsx"),  // صفحه موزیک های مورد علاقه من 
  route("/uploadmusic", "routes/uploadmusic.jsx"),  // صفحه ی اپلود موزیک
  route("/aboutus", "routes/aboutus.jsx"),  // صفحه درباره ما
  route("/contactus", "routes/contactUs.jsx"),  // صفحه درباره ما
  route("/artist", "routes/artist.jsx"),  // صفحه خواننده ها
  route("/album", "routes/album.jsx"),  // صفحه آلبوم‌ها
  route("/album/:trackId", "routes/albumDetail.jsx"),  // صفحه جزییات آلبوم
] satisfies RouteConfig;
