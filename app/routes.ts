import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("*", "routes/404.jsx"),
  route("/aboutus", "routes/aboutus.jsx"),
  route("/album/:trackId", "routes/track.jsx"),
] satisfies RouteConfig;
