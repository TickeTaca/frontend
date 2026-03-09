// src/pages/mypage/tabs/NotificationsTab.tsx
import { useState } from "react";

type NotifCategory = "all" | "booking" | "performance" | "payment";

const CATEGORY_LABELS: { key: NotifCategory; label: string }[] = [
  { key: "all",         label: "전체" },
  { key: "booking",     label: "예매" },
  { key: "performance", label: "공연" },
  { key: "payment",     label: "결제" },
];

const DUMMY_ALL_NOTIFICATIONS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  category: i % 3 === 0 ? "booking" : i % 3 === 1 ? "performance" : "payment" as NotifCategory,
  message: i % 3 === 0
    ? "아이유 THE GOLDEN HOUR WORLD TOUR 예매가 완료되었습니다."
    : i % 3 === 1
    ? "BTS WORLD TOUR 공연 D-7 알림입니다."
    : "아이유 THE GOLDEN HOUR WORLD TOUR 결제가 취소되었습니다.",
  time: `${i + 1}시간 전`,
  unread: i < 5,
}));

const CATEGORY_ICON: Record<NotifCategory, string> = {
  all:         "🔔",
  booking:     "🎫",
  performance: "🎤",
  payment:     "💳",
};

export default function NotificationsTab() {
  const [activeCategory, setActiveCategory] = useState<NotifCategory>("all");

  const filtered = DUMMY_ALL_NOTIFICATIONS.filter(
    (n) => activeCategory === "all" || n.category === activeCategory
  );

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
      {/* 헤더 */}
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <span className="text-[14px] font-bold">알림 기록</span>
        <span className="text-[12.5px] text-gray-400">전체 {DUMMY_ALL_NOTIFICATIONS.length}개</span>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 px-5 py-3 border-b border-gray-200">
        {CATEGORY_LABELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1.5 rounded-full text-[12.5px] font-medium transition ${
              activeCategory === key
                ? "bg-[#1a6ad4] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 알림 목록 */}
      <div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-300 text-[13px]">알림이 없습니다</div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-5 py-3.5 border-b border-gray-100 last:border-0 ${
                n.unread ? "bg-blue-50" : ""
              }`}
            >
              <span className="text-[18px] mt-0.5">{CATEGORY_ICON[n.category as NotifCategory]}</span>
              <div className="flex-1">
                <p className="text-[13.5px] text-gray-700">{n.message}</p>
                <p className="text-[11.5px] text-gray-400 mt-0.5">{n.time}</p>
              </div>
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-[#1a6ad4] mt-1.5 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}