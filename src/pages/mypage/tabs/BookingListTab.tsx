// src/pages/mypage/tabs/BookingListTab.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type BookingStatus = "confirmed" | "cancelled" | "completed";
type FilterKey = "all" | "confirmed" | "cancelled" | "completed";

interface Booking {
  id: string;
  bookingNo: string;
  status: BookingStatus;
  bookedAt: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  section: string;
  seats: string;
  seatCount: number;
  totalPrice: number;
  emoji: string;
}

const DUMMY_BOOKINGS: Booking[] = [
  {
    id: "1",
    bookingNo: "TCT-2025-08164891",
    status: "confirmed",
    bookedAt: "2025.07.04 10:31",
    eventTitle: "아이유 THE GOLDEN HOUR WORLD TOUR",
    eventDate: "2025.08.16 (토) 오후 7:00",
    venue: "잠실 올림픽주경기장",
    section: "A구역 스탠딩",
    seats: "A열 8번, A열 9번",
    seatCount: 2,
    totalPrice: 269280,
    emoji: "🎸",
  },
  {
    id: "2",
    bookingNo: "TCT-2025-07031220",
    status: "cancelled",
    bookedAt: "2025.07.03 22:10",
    eventTitle: "레미제라블 내한공연 2025",
    eventDate: "2025.09.20 (토) 오후 7:30",
    venue: "블루스퀘어 신한카드홀",
    section: "R석",
    seats: "D열 14번",
    seatCount: 1,
    totalPrice: 99000,
    emoji: "🎭",
  },
  {
    id: "3",
    bookingNo: "TCT-2025-06201045",
    status: "completed",
    bookedAt: "2025.06.20 14:22",
    eventTitle: "세계 록 페스티벌 2025 서울",
    eventDate: "2025.09.06 (토) 오후 4:00",
    venue: "서울월드컵경기장",
    section: "2일권 일반",
    seats: "자유석",
    seatCount: 2,
    totalPrice: 285600,
    emoji: "🎤",
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",       label: "전체" },
  { key: "confirmed", label: "예매 완료" },
  { key: "cancelled", label: "취소됨" },
  { key: "completed", label: "공연 완료" },
];

const STATUS_BADGE: Record<BookingStatus, { label: string; cls: string }> = {
  confirmed: { label: "● 예매 완료", cls: "bg-blue-100 text-[#1a6ad4]" },
  cancelled: { label: "취소됨",      cls: "bg-gray-100 text-gray-500" },
  completed: { label: "공연 완료",   cls: "bg-green-100 text-green-700" },
};

export default function BookingListTab() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = filter === "all"
    ? DUMMY_BOOKINGS
    : DUMMY_BOOKINGS.filter((b) => b.status === filter);

  const handleCancel = (bookingNo: string) => {
    if (window.confirm(`예매를 취소하시겠습니까?\n${bookingNo}`)) {
      alert("취소 처리되었습니다. (더미)");
    }
  };

  return (
    <div>
      {/* 헤더 + 필터 */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="flex items-center gap-2 text-[16px] font-bold">
          <span className="block w-[3px] h-[16px] bg-[#1a6ad4] rounded" />
          예매 내역
        </h2>
        <div className="flex gap-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 border rounded text-[12.5px] transition ${
                filter === key
                  ? "border-[#1a6ad4] bg-blue-50 text-[#1a6ad4] font-medium"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md py-16 text-center text-gray-400 text-[14px]">
            해당 조건의 예매 내역이 없습니다.
          </div>
        ) : (
          filtered.map((booking) => {
            const badge = STATUS_BADGE[booking.status];
            const isCancelled = booking.status === "cancelled";

            return (
              <div
                key={booking.id}
                className={`bg-white border border-gray-200 rounded-md overflow-hidden ${isCancelled ? "opacity-75" : ""}`}
              >
                {/* 카드 헤더 */}
                <div className="px-[18px] py-3.5 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[12px] font-medium px-2 py-0.5 rounded ${badge.cls}`}>
                      {badge.label}
                    </span>
                    <span className="text-[12px] text-gray-400 font-mono">
                      {booking.bookingNo}
                    </span>
                  </div>
                  <span className="text-[12px] text-gray-400">{booking.bookedAt}</span>
                </div>

                {/* 카드 본문 */}
                <div className="px-[18px] py-4 flex gap-4">
                  {/* 포스터 */}
                  <div className={`w-[70px] h-[93px] rounded flex items-center justify-center text-[28px] shrink-0 ${
                    isCancelled ? "bg-gray-100 grayscale" : "bg-[#dde4f0]"
                  }`}>
                    {booking.emoji}
                  </div>

                  {/* 정보 */}
                  <div className="flex-1">
                    <p className={`text-[15px] font-bold mb-1.5 ${isCancelled ? "text-gray-400" : ""}`}>
                      {booking.eventTitle}
                    </p>
                    <div className="flex flex-col gap-1 text-[13px] text-gray-500">
                      <span>📅 {booking.eventDate}</span>
                      <span>📍 {booking.venue}</span>
                      <span>💺 {booking.section} {booking.seats} ({booking.seatCount}석)</span>
                      <span className={booking.status === "cancelled" ? "text-red-500" : "text-[#f05a00] font-medium"}>
                        {booking.status === "cancelled"
                          ? `환불 완료 · ${booking.totalPrice.toLocaleString()}원`
                          : `💳 ${booking.totalPrice.toLocaleString()}원 결제 완료`}
                      </span>
                    </div>
                  </div>

                  {/* 버튼 */}
                  {!isCancelled && (
                    <div className="flex flex-col gap-2 justify-center shrink-0">
                      <button
                        onClick={() => navigate(`/mypage/booking/${booking.id}`)}
                        className="px-3.5 py-1.5 border border-gray-200 rounded text-[12.5px] text-[#1a6ad4] hover:bg-blue-50"
                      >
                        예매 상세
                      </button>
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(booking.bookingNo)}
                          className="px-3.5 py-1.5 border border-red-300 rounded text-[12.5px] text-red-500 hover:bg-red-50"
                        >
                          예매 취소
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}