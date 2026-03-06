// src/components/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useWaitingStore } from "../store/waiting.store";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isInQueue, leaveQueue } = useWaitingStore();
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    if (isInQueue) {
      logout();
      return;
    }
    logout();
  };

  return (
    <header className="w-full">
      <nav className="h-[50px] bg-[#1a6ad4] flex items-center px-6">
        <Link to="/"
          onClick={() => { if (isInQueue) leaveQueue(); }}
          className="text-white font-bold text-[20px] tracking-[-0.5px] mr-8">
          티키타카 <sub className="text-[10px] text-white/60 ml-1">TIKITAKA</sub>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {!currentUser ? (
            <button
              onClick={() => navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true })}
              className="text-[13px] px-4 py-1.5 rounded bg-white text-[#1a6ad4] font-bold"
            >
              로그인
            </button>
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