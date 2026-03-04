import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";

export default function BreadcrumbLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <Outlet />
    </div>
  );
}
