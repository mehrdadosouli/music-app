import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),  // صفحه اصلی
  route("*", "routes/404.jsx"),  // صفحه خطای 404
  route("/aboutus", "routes/aboutus.jsx"),  // صفحه درباره ما
  route("/album", "routes/album.jsx"),  // صفحه آلبوم‌ها
  route("/album/:trackId", "routes/albumDetail.jsx"),  // صفحه جزییات آلبوم
] satisfies RouteConfig;
