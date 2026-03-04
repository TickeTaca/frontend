// src/router/layouts/AdminLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../../pages/admin/AdminNav";
import { useAuthStore } from "../../store/auth.store";

export default function AdminLayout() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 GNB */}
      <nav className="h-[50px] bg-[#1a2236] flex items-center justify-between px-6 shrink-0 z-10">
        <span className="text-white font-bold text-[17px]">
          티키타카 <sub className="text-[11px] font-normal text-white/50">Admin</sub>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-[12.5px]">
            {currentUser?.email ?? "admin@tikitaka.kr"}
          </span>
          <button
            onClick={handleLogout}
            className="text-white/60 text-[12.5px] hover:text-white transition"
          >
            로그아웃
          </button>
        </div>
      </nav>

      {/* 사이드 네비 + 본문 */}
      <div className="flex flex-1 overflow-hidden">
        <AdminNav />
        <div className="flex-1 overflow-y-auto bg-[#f0f2f5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}