import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("*", "routes/404.tsx"),
  route("/aboutus", "routes/aboutus.tsx"),
  route("/album/:trackId", "routes/track.tsx"),
] satisfies RouteConfig;
