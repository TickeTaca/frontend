// src/pages/payment/SuccessPage.tsx
import { useNavigate } from "react-router-dom";

const DUMMY_SUCCESS = {
  eventTitle:  "아이유 THE GOLDEN HOUR WORLD TOUR",
  eventDate:   "2025.08.16 (토) 오후 7:00",
  venue:       "잠실 올림픽주경기장",
  section:     "A구역",
  seats:       "A열 8·9번",
  seatCount:   2,
  seatTotal:   264000,
  fee:         5280,
  bookingNo:   "TCT-2025-08164891",
};

export default function SuccessPage() {
  const navigate = useNavigate();

  const total = DUMMY_SUCCESS.seatTotal + DUMMY_SUCCESS.fee;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[640px] mx-auto px-6 py-10">

        {/* 완료 헤더 */}
        <div className="text-center mb-7">
          <div className="w-[60px] h-[60px] rounded-full bg-green-500 text-white text-[24px] flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-[22px] font-bold mb-1.5">예매가 완료되었습니다!</h2>
          <p className="text-[13.5px] text-gray-400">
            예매 확인서가 등록된 이메일로 발송되었습니다.
          </p>
        </div>

        {/* 티켓 카드 */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
          {/* 티켓 헤더 */}
          <div className="bg-[#1a6ad4] px-5 py-4 text-white">
            <p className="text-[17px] font-bold mb-1">{DUMMY_SUCCESS.eventTitle}</p>
            <p className="text-[13px] text-white/75">
              {DUMMY_SUCCESS.eventDate} · {DUMMY_SUCCESS.venue}
            </p>
          </div>

          {/* 티켓 본문 */}
          <div className="px-5 py-[18px]">
            {/* 구역/좌석/수량 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                ["구역", DUMMY_SUCCESS.section],
                ["좌석", DUMMY_SUCCESS.seats],
                ["수량", `${DUMMY_SUCCESS.seatCount}석`],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  <p className="text-[15px] font-bold">{value}</p>
                </div>
              ))}
            </div>

            {/* QR 코드 영역 */}
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-4 text-center text-[12.5px] text-gray-400 mb-4">
              📱 QR 코드 / 바코드 영역<br />
              <span className="text-[11px]">모의 티켓 이미지 — 스마트 티켓 기반 입장</span>
            </div>

            {/* 예매번호 */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 -mx-5 -mb-[18px] text-[12.5px]">
              <span className="text-gray-400">예매번호</span>
              <span className="font-bold font-mono tracking-wide">
                {DUMMY_SUCCESS.bookingNo}
              </span>
            </div>
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="bg-white border border-gray-200 rounded-md px-5 py-4 mb-4">
          <p className="text-[13.5px] font-bold mb-3">결제 내역</p>
          <div className="flex justify-between text-[13px] text-gray-500 mb-1.5">
            <span>좌석 금액</span>
            <span>{DUMMY_SUCCESS.seatTotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-500 mb-1.5">
            <span>예매 수수료</span>
            <span>{DUMMY_SUCCESS.fee.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-[14px] font-bold pt-2.5 border-t border-gray-200">
            <span>합계</span>
            <span className="text-[#f05a00]">{total.toLocaleString()}원</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 border border-gray-300 rounded text-[13.5px] text-gray-600 hover:bg-gray-50"
          >
            홈으로
          </button>
          <button
            onClick={() => navigate("/mypage")}
            className="w-full py-2.5 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0]"
          >
            내 예매 확인 →
          </button>
        </div>

      </div>
    </div>
  );
}