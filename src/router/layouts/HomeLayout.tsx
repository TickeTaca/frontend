import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import CategoryBar from "../../components/CategoryBar";

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBar />
      <Outlet />
    </div>
  );
}
