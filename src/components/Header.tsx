// src/components/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useWaitingStore } from "../store/waiting.store";
import { useEffect, useRef, useState } from "react";

const DUMMY_NOTIFICATIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  message: i % 3 === 0 ? "예매가 완료되었습니다." : i % 3 === 1 ? "공연 D-7 알림입니다." : "결제가 취소되었습니다.",
  time: `${i + 1}시간 전`,
  unread: i < 3,
}));

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isInQueue, leaveQueue } = useWaitingStore();
  const currentUser = useAuthStore((s) => s.currentUser);
  const [showNotifications, setShowNotifications] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
      setShowNotifications(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

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
              <Link to="/mypage" className="text-white/90 text-[13px]">{currentUser.name} 님</Link>

              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications((v) => !v)}
                  className="relative text-white text-[16px] cursor-pointer"
                >
                  🔔
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-[32px] w-[320px] bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <span className="text-[14px] font-bold text-gray-800">알림</span>
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400 text-[12px]">✕</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {DUMMY_NOTIFICATIONS.map((n) => (
                        <div key={n.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 ${n.unread ? "bg-blue-50" : ""}`}>
                          <p className="text-[13px] text-gray-700">{n.message}</p>
                          <p className="text-[11.5px] text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-gray-200 text-center">
                      <Link
                        to="/mypage?tab=notifications"
                        onClick={() => setShowNotifications(false)}
                        className="text-[12.5px] text-[#1a6ad4]"
                      >
                        전체 알림 보기
                      </Link>
                    </div>
                  </div>
                )}
              </div>

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