// src/components/Header.tsx
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

export default function Header({
  isLoggedIn = false,
  username,
  notificationCount = 0,
  onLogout,
}: HeaderProps) {
  return (
    <header className="w-full">
      {/* GNB */}
      <nav className="h-[50px] bg-[#1a6ad4] flex items-center px-6">
        <div className="text-white font-bold text-[20px] tracking-[-0.5px] mr-8">
          티키타카 <sub className="text-[10px] text-white/60 ml-1">TIKITAKA</sub>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-[13px] px-4 py-1.5 rounded bg-white text-[#1a6ad4] font-bold"
            >
              로그인
            </Link>
          ) : (
            <>
              <span className="text-white/90 text-[13px]">
                {username} 님
              </span>

              <div className="relative text-white text-[16px] cursor-pointer">
                🔔
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 text-[9px] bg-red-600 rounded-full flex items-center justify-center border-2 border-[#1a6ad4]">
                    {notificationCount}
                  </span>
                )}
              </div>

              <button
                onClick={onLogout}
                className="text-[12px] px-3 py-1 rounded border border-white/50 text-white/90"
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
