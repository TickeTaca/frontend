// src/pages/payment/FailPage.tsx
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/booking.store";
import { useEffect } from "react";

const DUMMY_FAILED = {
  eventTitle: "아이유 THE GOLDEN HOUR WORLD TOUR",
  section:    "A구역 1층 스탠딩",
  seats:      ["A열 8번", "A열 9번"],
};

export default function FailPage() {
  const navigate = useNavigate();
  
  const { paymentDone, resetBooking } = useBookingStore();

  useEffect(() => {
    if (!paymentDone) { navigate("/", { replace: true }); return; }
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      resetBooking();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[600px] mx-auto px-6 py-12 text-center">

        {/* 아이콘 */}
        <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-500 text-red-500 text-[28px] flex items-center justify-center mx-auto mb-5">
          ✕
        </div>
        <h2 className="text-[22px] font-bold text-red-600 mb-2">결제에 실패했습니다</h2>
        <p className="text-[14px] text-gray-500 leading-[1.7] mb-6">
          결제 처리 중 오류가 발생했습니다.<br />
          선택하셨던 좌석이 <strong>자동으로 해제</strong>되었습니다.
        </p>

        {/* 해제된 좌석 정보 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-left mb-5">
          <p className="text-[13px] font-bold text-gray-700 mb-3">해제된 좌석 정보</p>
          {[
            ["이벤트", DUMMY_FAILED.eventTitle],
            ["좌석",   `${DUMMY_FAILED.section} ${DUMMY_FAILED.seats.join(", ")}`],
            ["상태",   "좌석 재오픈됨 (다른 사용자 선택 가능)"],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              className={`flex justify-between text-[13px] py-1.5 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <span className="text-gray-400">{label}</span>
              <span className={label === "상태" ? "text-green-600 font-medium" : ""}>{value}</span>
            </div>
          ))}
        </div>

        {/* 안내 */}
        <div className="bg-orange-50 border border-orange-200 rounded-md px-4 py-3 text-[12.5px] text-[#f05a00] text-left mb-6">
          ⚠ 입장 토큰이 유효한 경우 좌석 선택을 다시 시도할 수 있습니다. 토큰 만료 시 대기열에 재진입이 필요합니다.
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 border border-gray-300 rounded text-[13.5px] text-gray-600 hover:bg-gray-50"
          >
            홈으로
          </button>
          <button
            onClick={() => {resetBooking(); navigate("/seat") }}
            className="w-full py-2.5 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0]"
          >
            좌석 다시 선택하기
          </button>
        </div>

      </div>
    </div>
  );
}