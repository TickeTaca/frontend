// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full">
      <nav className="h-[50px] bg-[#1a6ad4] flex items-center px-6">
        <Link to="/" className="text-white font-bold text-[20px] tracking-[-0.5px] mr-8">
          티키타카 <sub className="text-[10px] text-white/60 ml-1">TIKITAKA</sub>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {!currentUser ? (
            <Link
              to="/login"
              className="text-[13px] px-4 py-1.5 rounded bg-white text-[#1a6ad4] font-bold"
            >
              로그인
            </Link>
          ) : (
            <>
              <span className="text-white/90 text-[13px]">{currentUser.name} 님</span>

              <Link to="/mypage" className="relative text-white text-[16px] cursor-pointer">
                🔔
              </Link>

              {currentUser.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-[12px] px-3 py-1 rounded bg-white/20 text-white hover:bg-white/30 transition"
                >
                  관리자
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-[12px] px-3 py-1 rounded border border-white/50 text-white/90 hover:bg-white/10 transition"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}