import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Narbav";
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
