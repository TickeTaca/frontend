// src/pages/admin/AdminNav.tsx
import { NavLink } from "react-router-dom";

const NAV_GROUPS = [
  {
    label: "메인",
    items: [
      { to: "/admin/dashboard", icon: "📊", label: "대시보드" },
      { to: "/admin/events",    icon: "🎫", label: "이벤트 관리" },
    ],
  },
  {
    label: "예매 관리",
    items: [
      { to: "/admin/queue",    icon: "⏳", label: "대기열 관리" },
      { to: "/admin/payments", icon: "💳", label: "결제 내역" },
      { to: "/admin/refund",   icon: "↩️", label: "취소/환불" },
    ],
  },
  {
    label: "시스템",
    items: [
      { to: "/admin/stats", icon: "📈", label: "통계 분석" },
    ],
  },
];

export default function AdminNav() {
  return (
    <nav className="w-[200px] bg-[#1a2236] text-white flex flex-col shrink-0 overflow-y-auto">
      <div className="px-4 py-5 border-b border-white/10">
        <p className="text-[14px] font-bold">관리자 콘솔</p>
        <p className="text-[11px] text-white/40 mt-0.5">TIKITAKA v2.5</p>
      </div>
      <div className="flex-1 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            <p className="px-4 py-1.5 text-[10.5px] text-white/35 uppercase tracking-widest">
              {group.label}
            </p>
            {group.items.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition ${
                    isActive
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <span>{icon}</span>
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}