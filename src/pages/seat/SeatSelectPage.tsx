// src/pages/seat/SeatSelectPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/booking.store";

// ── 타입
type SeatStatus = "available" | "held" | "my-hold" | "reserved";

interface Seat {
  id: string;
  row: number;
  col: number;
  status: SeatStatus;
}

interface Section {
  id: string;
  name: string;
  type: string;
  price: number;
  color: string;
  soldOut?: boolean;
}

// ── 더미 데이터
const SECTIONS: Section[] = [
  { id: "A", name: "A구역 스탠딩", type: "스탠딩", price: 132000, color: "#e8a040" },
  { id: "B", name: "B구역 지정석", type: "지정석", price: 99000,  color: "#4a90d9" },
  { id: "C", name: "C구역 지정석", type: "지정석", price: 77000,  color: "#7cb87c" },
  { id: "D", name: "D구역 (매진)", type: "지정석", price: 55000,  color: "#ccc", soldOut: true },
];

const ROWS = 8;
const COLS = 20;

function generateSeats(sectionId: string): Seat[] {
  const seats: Seat[] = [];
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const rand = Math.random();
      let status: SeatStatus = "available";
      if (sectionId === "D") {
        status = "reserved";
      } else if (rand < 0.12) {
        status = "reserved";
      } else if (rand < 0.22) {
        status = "held";
      }
      seats.push({ id: `${sectionId}-${r}-${c}`, row: r, col: c, status });
    }
  }
  return seats;
}

// ── 상수
const FEE_RATE = 0.02;
const ROW_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const SEAT_COLOR: Record<SeatStatus, string> = {
  available: "bg-green-500 opacity-80 hover:opacity-100 cursor-pointer",
  held:      "bg-gray-400 cursor-not-allowed",
  "my-hold": "bg-[#1a6ad4] cursor-pointer",
  reserved:  "bg-red-500 cursor-not-allowed",
};

export default function SeatSelectPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<Section>(SECTIONS[0]);
  const [seats, setSeats] = useState<Seat[]>(() => generateSeats(SECTIONS[0].id));
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { lockSeats } = useBookingStore();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // ── 구역 전환
  const handleSectionChange = (sec: Section) => {
    if (sec.soldOut) return;
    setActiveSection(sec);
    setSeats(generateSeats(sec.id));
    setSelectedSeats([]);
    setErrorMsg(null);
  };

  // ── 좌석 클릭
  const handleSeatClick = useCallback((seat: Seat) => {
    if (seat.status === "held" || seat.status === "reserved") return;

    setErrorMsg(null);

    if (seat.status === "my-hold") {
      // 선택 해제
      setSeats((prev) =>
        prev.map((s) => s.id === seat.id ? { ...s, status: "available" } : s)
      );
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
      return;
    }

    if (selectedSeats.length >= 4) {
      setErrorMsg("최대 4석까지 선택할 수 있습니다.");
      return;
    }

    // 더미: 20% 확률로 충돌 에러
    if (Math.random() < 0.2) {
      setErrorMsg("선택하신 좌석 중 이미 다른 사용자가 선택한 좌석이 포함되어 있습니다.\n다른 좌석을 선택해주세요.");
      setSeats((prev) =>
        prev.map((s) => s.id === seat.id ? { ...s, status: "held" } : s)
      );
      return;
    }

    setSeats((prev) =>
      prev.map((s) => s.id === seat.id ? { ...s, status: "my-hold" } : s)
    );
    setSelectedSeats((prev) => {
      const next = [...prev, { ...seat, status: "my-hold" as SeatStatus }];
      return next;
    });
  }, [selectedSeats.length]);

  // ── 선택 해제 (사이드바 ✕)
  const handleRemoveSeat = (seat: Seat) => {
    setSeats((prev) =>
      prev.map((s) => s.id === seat.id ? { ...s, status: "available" } : s)
    );
    setSelectedSeats((prev) => {
      const next = prev.filter((s) => s.id !== seat.id);
      return next;
    });
  };

  const totalPrice = selectedSeats.length * activeSection.price;
  const fee = Math.round(totalPrice * FEE_RATE);

  return (
    <div className="bg-gray-100 h-[calc(100vh-50px)]">
      <div className="grid grid-cols-[1fr_320px] h-full">

        {/* ── 좌석 영역 */}
        <div className="flex flex-col bg-white border-r border-gray-200">

          {/* 헤더바 */}
          <div className={"px-4 py-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50"}>
            <div className="flex items-center gap-3">
              <span className="text-[13.5px] font-bold">
                아이유 THE GOLDEN HOUR WORLD TOUR
              </span>
              {activeSection && (
                <span className="text-[12.5px] text-gray-400">
                  · {activeSection.name}
                </span>
              )}
            </div>
          </div>

          {/* 에러 토스트 */}
          {errorMsg && (
            <div className="mx-4 mt-3 bg-red-50 border border-red-300 rounded-md p-3 flex items-start gap-2.5">
              <span className="text-base shrink-0">⚠️</span>
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-red-700 mb-0.5">
                  좌석 선택에 실패했습니다
                </p>
                <p className="text-[12.5px] text-red-600 whitespace-pre-line leading-[1.6]">
                  {errorMsg}
                </p>
                <p className="text-[11.5px] text-gray-400 font-mono mt-1">
                  에러코드: SEAT_ALREADY_HELD
                </p>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>
          )}

          {/* 좌석 맵 */}
          <div className="flex-1 relative bg-[#f8f9fc] flex items-center justify-center overflow-hidden">

            {/* STAGE */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[#cdd6e8] text-[#5b72a0] text-[12px] font-bold px-12 py-2 rounded tracking-widest">
              STAGE
            </div>

            {/* 구역 패널 */}
            <div className="absolute left-3.5 top-3.5 bg-white border border-gray-200 rounded-md shadow-md w-[160px] overflow-hidden z-10">
              <div className="px-3 py-2 text-[12px] font-bold text-gray-700 border-b border-gray-200 bg-gray-50">
                구역 선택
              </div>
              {SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => handleSectionChange(sec)}
                  className={`flex items-center gap-2 px-3 py-2 border-b border-gray-100 last:border-0 ${
                    sec.soldOut
                      ? "opacity-40 cursor-not-allowed"
                      : activeSection.id === sec.id
                      ? "bg-blue-50 cursor-pointer"
                      : "cursor-pointer hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: sec.color }}
                  />
                  <div>
                    <p className="text-[12px]">{sec.name}</p>
                    <p className="text-[11px] text-gray-400">
                      {sec.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 좌석 그리드 */}
            <div
              className={"mt-14 flex flex-col gap-1.5 items-center"}
            >
              {Array.from({ length: ROWS }, (_, ri) => (
                <div key={ri} className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400 w-4 text-center">
                    {ROW_LABELS[ri]}
                  </span>
                  {seats
                    .filter((s) => s.row === ri + 1)
                    .map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        title={`${ROW_LABELS[ri]}열 ${seat.col}번`}
                        className={`w-5 h-4 rounded-sm border border-black/10 text-[0px] transition-opacity ${
                          SEAT_COLOR[seat.status]
                        }`}
                      />
                    ))}
                </div>
              ))}
            </div>

            {/* 줌 컨트롤 */}
            <div className="absolute bottom-3.5 right-3.5 flex flex-col gap-1">
              {["+", "⌂", "−"].map((icon) => (
                <button
                  key={icon}
                  className="w-[30px] h-[30px] bg-white border border-gray-200 rounded text-[14px] flex items-center justify-center hover:bg-gray-50"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 범례 */}
          <div className="px-4 py-2 border-t border-gray-200 flex gap-5 items-center bg-white">
            {[
              ["선택 가능", "bg-green-500 opacity-80"],
              ["내가 선택", "bg-[#1a6ad4]"],
              ["타인 점유", "bg-gray-400"],
              ["예매완료",  "bg-red-500"],
            ].map(([label, cls]) => (
              <div key={label} className="flex items-center gap-1.5 text-[11.5px] text-gray-500">
                <div className={`w-4 h-[13px] rounded-sm ${cls}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── 사이드바 */}
        <div className="flex flex-col bg-white">
          <div className="px-4 py-3.5 border-b border-gray-200 text-[14px] font-bold bg-gray-50">
            선택한 좌석{" "}
            <span className="font-normal text-gray-400 text-[12px]">(최대 4석)</span>
          </div>

          {/* 선택 좌석 목록 */}
          <div className="flex-1 p-3 flex flex-col gap-1.5 overflow-y-auto">
            {selectedSeats.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-300 text-[13px] text-center gap-2 py-10">
                {errorMsg ? (
                  <>
                    <span className="text-[28px]">❌</span>
                    <span className="text-gray-400">
                      선택 실패로 인해 좌석이 해제되었습니다.<br />
                      다른 좌석을 선택해주세요.
                    </span>
                  </>
                ) : (
                  <span>좌석을 선택해주세요</span>
                )}
              </div>
            ) : (
              selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-gray-50 border border-gray-200 rounded-md p-2.5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10.5px] text-[#1a6ad4] font-medium mb-0.5">
                      {activeSection.name}
                    </p>
                    <p className="text-[14px] font-medium">
                      {ROW_LABELS[seat.row - 1]}열 {seat.col}번
                    </p>
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {activeSection.price.toLocaleString()}원
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveSeat(seat)}
                    className="w-[22px] h-[22px] rounded border border-gray-200 text-gray-400 text-[12px] flex items-center justify-center hover:bg-red-50 hover:border-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 금액 + 결제 */}
          <div className="border-t-2 border-gray-200 px-4 py-3.5">
            <div className="flex justify-between text-[13px] text-gray-500 mb-1.5">
              <span>좌석 금액 ({selectedSeats.length}석)</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-[13px] text-gray-500 mb-2.5">
              <span>예매 수수료</span>
              <span>{fee.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center pt-2.5 border-t border-gray-200 mb-3">
              <span className="text-[14px] font-bold">합계</span>
              <span className="text-[20px] font-bold text-[#f05a00]">
                {(totalPrice + fee).toLocaleString()}
                <small className="text-[12px] font-normal text-gray-400">원</small>
              </span>
            </div>
            <button
              disabled={selectedSeats.length === 0}
              onClick={() => {
                if(Math.random() < 0.2){
                  setErrorMsg("선택하신 좌석 중 이미 다른 사용자가 점유한 좌석이 포함되어 있습니다. \n다른 좌석을 선택해주세요.");
                  return;
                }
                lockSeats();
                navigate("/payment/check", { replace: true});
              }}
              className="w-full py-2.5 bg-[#1a6ad4] text-white rounded font-bold hover:bg-[#1458b0] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              {selectedSeats.length === 0 ? "좌석을 선택해주세요" : "결제하기"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}