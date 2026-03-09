// src/pages/mypage/MyPage.tsx
import { useState } from "react";
import BookingListTab from "./tabs/BookingListTab";
import NotificationTab from "./tabs/NotificationTab";
import ProfileTab from "./tabs/ProfileTab";
import PasswordTab from "./tabs/PasswordTab";
import { useSearchParams } from "react-router-dom";
import NotificationsTab from "./tabs/NotificationsTab";

type TabKey = "bookings" | "notifications" | "notification" | "profile" | "password";

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: "bookings",     label: "예매 내역" },
  { key: "notifications", label: "알림 기록" },
  { key: "notification", label: "알림 설정" },
  { key: "profile",      label: "회원 정보 수정" },
  { key: "password",     label: "비밀번호 변경" },
];

const DUMMY_USER = {
  name:  "홍길동",
  email: "hong@example.com",
};

export default function MyPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(searchParams.get("tab") as TabKey) ?? "bookings";

  const renderTab = () => {
    switch (activeTab) {
      case "bookings":     return <BookingListTab />;
      case "notifications": return <NotificationsTab />;
      case "notification": return <NotificationTab />;
      case "profile":      return <ProfileTab />;
      case "password":     return <PasswordTab />;
      default: return <BookingListTab />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 py-6">
        <div className="grid grid-cols-[220px_1fr] gap-5">

          {/* 사이드 네비 */}
          <div className="self-start">
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              {/* 유저 정보 */}
              <div className="px-4 py-5 border-b border-gray-200 bg-blue-50">
                <p className="text-[16px] font-bold text-gray-900 mb-0.5">{DUMMY_USER.name} 님</p>
                <p className="text-[12.5px] text-gray-400">{DUMMY_USER.email}</p>
              </div>

              {/* 탭 목록 */}
              <div className="py-2">
                {NAV_ITEMS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-4 py-2.5 text-[13.5px] transition ${
                      activeTab === key
                        ? "text-[#1a6ad4] font-bold bg-blue-50 border-l-[3px] border-[#1a6ad4]"
                        : "text-gray-500 hover:bg-gray-50 border-l-[3px] border-transparent"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 탭 컨텐츠 */}
          <div>{renderTab()}</div>

        </div>
      </div>
    </div>
  );
}