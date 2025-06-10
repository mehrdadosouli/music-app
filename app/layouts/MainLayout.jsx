import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="container flex pt-10">
      <div className="w-5/6">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
      <aside className="w-1/6">eeeeeeeeeeeeee</aside>
    </div>
  );
}
