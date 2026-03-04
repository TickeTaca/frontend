// src/pages/mypage/BookingDetailPage.tsx
import { useNavigate, useParams } from "react-router-dom";

const ROW_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROWS = 6;
const COLS = 16;
// 더미: A열 8번, 9번이 내 좌석
const MY_SEATS = [{ row: 0, col: 7 }, { row: 0, col: 8 }];

const DUMMY_BOOKINGS: Record<string, {
  bookingNo: string;
  payNo: string;
  eventTitle: string;
  eventShort: string;
  eventDate: string;
  venue: string;
  section: string;
  seats: string;
  seatCount: number;
  totalPrice: number;
  cancelDeadline: string;
}> = {
  "1": {
    bookingNo:      "TCT-2025-08164891",
    payNo:          "PAY-2025-9182736",
    eventTitle:     "아이유 THE GOLDEN HOUR WORLD TOUR",
    eventShort:     "아이유 WORLD TOUR",
    eventDate:      "2025.08.16 (토) 오후 7:00",
    venue:          "잠실 올림픽주경기장",
    section:        "A구역 스탠딩",
    seats:          "A열 8번, A열 9번",
    seatCount:      2,
    totalPrice:     269280,
    cancelDeadline: "2025.08.15 오후 7:00",
  },
  "3": {
    bookingNo:      "TCT-2025-06201045",
    payNo:          "PAY-2025-8827364",
    eventTitle:     "세계 록 페스티벌 2025 서울",
    eventShort:     "록 페스티벌 2025",
    eventDate:      "2025.09.06 (토) 오후 4:00",
    venue:          "서울월드컵경기장",
    section:        "2일권 일반",
    seats:          "자유석",
    seatCount:      2,
    totalPrice:     285600,
    cancelDeadline: "2025.09.05 오후 4:00",
  },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-[18px] py-[13px] text-[14px] font-bold border-b border-gray-200 bg-gray-50 flex items-center gap-1.5">
      <span className="block w-[3px] h-[14px] bg-[#1a6ad4] rounded" />
      {title}
    </div>
  );
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const booking = id ? DUMMY_BOOKINGS[id] : null;

  if (!booking) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-[18px] mb-3">예매 정보를 찾을 수 없습니다.</p>
          <button onClick={() => navigate("/mypage")} className="text-[#1a6ad4] text-[14px]">
            마이페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    if (window.confirm(`예매를 취소하시겠습니까?\n${booking.bookingNo}\n\n취소 기한: ${booking.cancelDeadline}`)) {
      alert("취소 처리되었습니다. (더미)");
      navigate("/mypage");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 py-6">

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/mypage")}
              className="text-gray-400 hover:text-gray-600 text-[13px]"
            >
              ← 마이페이지
            </button>
            <h2 className="text-[18px] font-bold">예매 상세</h2>
          </div>
          <span className="text-[13px] font-medium px-3 py-1.5 rounded bg-blue-100 text-[#1a6ad4]">
            ● 예매 완료
          </span>
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-5">

          {/* 왼쪽 */}
          <div className="flex flex-col gap-3.5">

            {/* 예매 정보 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="예매 정보" />
              <div className="px-[18px] py-4">
                {[
                  ["예매번호",   booking.bookingNo, "font-mono font-medium"],
                  ["이벤트",     booking.eventTitle, "font-medium"],
                  ["공연일",     booking.eventDate, ""],
                  ["공연장",     booking.venue, ""],
                  ["구역/좌석",  `${booking.section} · ${booking.seats}`, ""],
                  ["결제금액",   `${booking.totalPrice.toLocaleString()}원`, "font-bold text-[#f05a00]"],
                  ["결제확인번호", booking.payNo, "font-mono"],
                ].map(([label, value, cls], i, arr) => (
                  <div key={label} className={`flex justify-between py-1.5 text-[13px] ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-gray-400 shrink-0 mr-4">{label}</span>
                    <span className={cls}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 좌석 위치 시각화 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="좌석 위치" />
              <div className="p-4 bg-[#f8f9fc] flex flex-col items-center gap-3">
                <div className="bg-[#cdd6e8] text-[#5b72a0] text-[12px] font-bold px-10 py-1.5 rounded tracking-widest">
                  STAGE
                </div>
                <div className="flex flex-col gap-1 items-center scale-90">
                  {Array.from({ length: ROWS }, (_, ri) => (
                    <div key={ri} className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 w-4 text-center">
                        {ROW_LABELS[ri]}
                      </span>
                      {Array.from({ length: COLS }, (_, ci) => {
                        const isMine = MY_SEATS.some((s) => s.row === ri && s.col === ci);
                        return (
                          <div
                            key={ci}
                            className={`w-5 h-4 rounded-sm border border-black/10 ${
                              isMine ? "bg-[#1a6ad4]" : "bg-green-400 opacity-60"
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border-2 border-[#1a6ad4] rounded px-4 py-2 text-[13px] text-[#1a6ad4] font-medium">
                  📍 {booking.seats}
                </div>
              </div>
            </div>

            {/* 취소 안내 */}
            <div className="bg-orange-50 border border-orange-200 rounded-md px-4 py-3.5 text-[13px] text-[#f05a00] leading-[1.7]">
              <strong className="block mb-1">취소/환불 안내</strong>
              공연일 24시간 전까지 취소 가능합니다. 취소 기한: <strong>{booking.cancelDeadline}</strong><br />
              결제일 기준 취소 수수료가 적용될 수 있습니다.
            </div>
          </div>

          {/* 오른쪽: 스마트 티켓 */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-[#1a6ad4] px-5 py-4 text-white">
                <p className="text-[17px] font-bold mb-1">{booking.eventShort}</p>
                <p className="text-[13px] text-white/75">{booking.eventDate}</p>
              </div>
              <div className="px-5 py-[18px]">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    ["구역", booking.section.split(" ")[0]],
                    ["좌석", booking.seats.split(",")[0].trim()],
                    ["수량", `${booking.seatCount}석`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10.5px] text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-[15px] font-bold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-6 text-center mb-3.5">
                  <p className="text-[32px] mb-1.5">📱</p>
                  <p className="text-[12px] text-gray-400">QR 코드 / 바코드<br />(모의 스마트 티켓)</p>
                </div>
                <div className="flex justify-between text-[12px] text-gray-400 pt-3 border-t border-gray-200">
                  <span>예매번호</span>
                  <span className="font-mono font-medium">{booking.bookingNo}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCancel}
              className="w-full py-3 mt-3 border border-red-400 text-red-500 rounded font-bold text-[13.5px] hover:bg-red-50 transition"
            >
              예매 취소 신청
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}