// src/pages/mypage/tabs/NotificationTab.tsx
import { useState } from "react";

export default function NotificationTab() {
  const [settings, setSettings] = useState({
    bookingOpen:  true,
    queueReady:   true,
    cancelAlarm:  false,
    eventRemind:  true,
    marketing:    false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: "bookingOpen" as const,  label: "예매 오픈 알림",        desc: "관심 공연의 예매 오픈 시 알림을 받습니다." },
    { key: "queueReady"  as const,  label: "대기열 입장 준비 알림", desc: "대기 순번 도달 시 푸시 알림을 받습니다." },
    { key: "cancelAlarm" as const,  label: "취소표 발생 알림",      desc: "매진 공연의 취소표 발생 시 알림을 받습니다." },
    { key: "eventRemind" as const,  label: "공연 당일 리마인더",    desc: "공연 당일 오전 10시에 알림을 받습니다." },
    { key: "marketing"   as const,  label: "마케팅 수신 동의",      desc: "할인 쿠폰, 이벤트 등 프로모션 정보를 받습니다." },
  ];

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[16px] font-bold mb-4">
        <span className="block w-[3px] h-[16px] bg-[#1a6ad4] rounded" />
        알림 설정
      </h2>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        {items.map(({ key, label, desc }, i, arr) => (
          <div
            key={key}
            className={`flex items-center justify-between px-5 py-4 ${
              i < arr.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-[14px] font-medium mb-0.5">{label}</p>
              <p className="text-[12.5px] text-gray-400">{desc}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`w-11 h-6 rounded-full relative transition-colors ${
                settings[key] ? "bg-[#1a6ad4]" : "bg-gray-200"
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings[key] ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-5 py-2 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0]">
          저장
        </button>
      </div>
    </div>
  );
}