// src/pages/payment/CheckPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/booking.store";

type PaymentMethod = "card" | "kakao" | "naver" | "payco" | "transfer";

const HOLD_SECONDS = 10 * 60;

const PAYMENT_METHODS: { key: PaymentMethod; label: string }[] = [
  { key: "card",     label: "신용/체크카드" },
  { key: "kakao",    label: "카카오페이" },
  { key: "naver",    label: "네이버페이" },
  { key: "payco",    label: "페이코" },
  { key: "transfer", label: "무통장입금" },
];

const DUMMY_ORDER = {
  eventTitle:   "아이유 THE GOLDEN HOUR WORLD TOUR",
  eventDate:    "2025.08.16 (토) 오후 7:00",
  venue:        "잠실 올림픽주경기장",
  section:      "A구역 1층 스탠딩",
  seats:        ["A열 8번", "A열 9번"],
  pricePerSeat: 132000,
};

const STEPS = ["대기열", "좌석 선택", "결제 확인", "예매 완료"] as const;

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-[18px] py-[13px] text-[14px] font-bold border-b border-gray-200 bg-gray-50 flex items-center gap-1.5">
      <span className="block w-[3px] h-[14px] bg-[#1a6ad4] rounded" />
      {title}
    </div>
  );
}

export default function CheckPage() {
  const navigate = useNavigate();

  const [method, setMethod]             = useState<PaymentMethod>("card");
  const [agreeAll, setAgreeAll]         = useState(false);
  const [agree1, setAgree1]             = useState(false);
  const [agree2, setAgree2]             = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { seatLocked, completePayment } = useBookingStore();
  const [remainSec, setRemainSec] = useState(HOLD_SECONDS);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!seatLocked) { navigate("/", { replace: true }); return; }
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!seatLocked) return;
    if (remainSec <= 0) { setIsExpired(true); return; }
    const t = setTimeout(() => setRemainSec((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seatLocked, remainSec]);

  useEffect(() => {
    if (isExpired) navigate("/seat", { replace: true });
  }, [isExpired]);

  const seatCount = DUMMY_ORDER.seats.length;
  const seatTotal = DUMMY_ORDER.pricePerSeat * seatCount;
  const fee       = Math.round(seatTotal * 0.02);
  const total     = seatTotal + fee;

  const canPay = agree1 && agree2 && !isProcessing && !isExpired;

  const handleAgreeAll = (v: boolean) => { setAgreeAll(v); setAgree1(v); setAgree2(v); };
  const handleAgree1   = (v: boolean) => { setAgree1(v); setAgreeAll(v && agree2); };
  const handleAgree2   = (v: boolean) => { setAgree2(v); setAgreeAll(agree1 && v); };

  const handlePay = async () => {
    if (!canPay) return;
    setIsProcessing(true);
    // 더미: 1.5초 대기 후 분기 — 실제에서는 PG사 리다이렉트로 대체
    await new Promise((r) => setTimeout(r, 1500));
    completePayment();
    navigate(Math.random() < 0.2 ? "/payment/fail" : "/payment/success", { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 py-6">

        {/* 4단계 스텝 */}
        <div className="flex bg-white border border-gray-200 rounded-md overflow-hidden mb-7">
          {STEPS.map((step, i) => {
            const isDone   = i < 2;
            const isActive = i === 2;
            return (
              <div
                key={step}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-medium border-r border-gray-200 last:border-0 ${
                  isActive ? "bg-[#1a6ad4] text-white font-bold"
                  : isDone  ? "bg-white text-[#1a6ad4]"
                  : "bg-gray-50 text-gray-400"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isActive ? "bg-white/30 text-white"
                  : isDone  ? "bg-[#1a6ad4] text-white"
                  : "bg-gray-300 text-white"
                }`}>
                  {isDone ? "✓" : i + 1}
                </span>
                {step}
              </div>
            );
          })}
        </div>
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-md mb-5 border text-[13px] font-medium ${
          remainSec <= 60 ? "bg-red-50 border-red-300 text-red-600" : "bg-orange-50 border-orange-200 text-[#f05a00]"
        }`}>
          <span>⏱ 좌석 임시 점유 시간 — 시간 내 결제를 완료해주세요</span>
          <strong>{`${String(Math.floor(remainSec / 60)).padStart(2, "0")}:${String(remainSec % 60).padStart(2, "0")}`}</strong>
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-5">

          {/* 왼쪽 */}
          <div className="flex flex-col gap-3.5">

            {/* 예매 정보 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="예매 정보" />
              <div className="px-[18px] py-4">
                {[
                  ["공연명",    DUMMY_ORDER.eventTitle],
                  ["공연일",    DUMMY_ORDER.eventDate],
                  ["공연장",    DUMMY_ORDER.venue],
                  ["구역/좌석", `${DUMMY_ORDER.section} · ${DUMMY_ORDER.seats.join(", ")} (${seatCount}석)`],
                ].map(([label, value], i, arr) => (
                  <div key={label} className={`flex justify-between py-2 text-[13.5px] ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-gray-400 shrink-0 mr-4">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="결제 수단" />
              <div className="px-[18px] py-4">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  {PAYMENT_METHODS.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setMethod(key)}
                      className={`px-4 py-2 border-[1.5px] rounded text-[13px] font-medium transition ${
                        method === key
                          ? "border-[#1a6ad4] bg-blue-50 text-[#1a6ad4]"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3.5 text-[13px] text-gray-400 text-center">
                  카드번호 입력 영역 — PG사 결제 모듈 삽입 영역
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="이용 약관 동의" />
              <div className="px-[18px] py-4">
                <label className="flex items-center gap-2 py-2 border-b border-gray-100 text-[13px] font-medium cursor-pointer">
                  <input type="checkbox" checked={agreeAll} onChange={(e) => handleAgreeAll(e.target.checked)} className="accent-[#1a6ad4]" />
                  전체 동의
                </label>
                {[
                  { checked: agree1, onChange: handleAgree1, label: "[필수] 개인정보 수집 및 이용 동의" },
                  { checked: agree2, onChange: handleAgree2, label: "[필수] 구매조건 확인 및 결제 진행 동의" },
                ].map(({ checked, onChange, label }, i, arr) => (
                  <label key={label} className={`flex items-center gap-2 py-2 text-[13px] text-gray-500 cursor-pointer ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-[#1a6ad4]" />
                    <span>{label}</span>
                    <button className="ml-auto text-[12px] text-[#1a6ad4] shrink-0">내용 보기</button>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 결제 요약 */}
          <div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden sticky top-4">
              <div className="bg-[#1a6ad4] text-white px-[18px] py-[13px] text-[14px] font-bold">결제 금액</div>
              <div className="px-[18px] py-4">
                <div className="flex justify-between text-[13px] py-1.5 border-b border-gray-100">
                  <span className="text-gray-400">{DUMMY_ORDER.section} × {seatCount}석</span>
                  <span>{seatTotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[13px] py-1.5 border-b border-gray-200 mb-3">
                  <span className="text-gray-400">예매 수수료</span>
                  <span>{fee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center mb-3.5">
                  <span className="text-[15px] font-bold">최종 결제액</span>
                  <span className="text-[22px] font-bold text-[#f05a00]">{total.toLocaleString()}원</span>
                </div>
                <button
                  onClick={handlePay}
                  disabled={!canPay}
                  className="w-full py-3.5 bg-[#1a6ad4] text-white rounded font-bold text-[16px] hover:bg-[#1458b0] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 transition"
                >
                  {isProcessing ? "결제 처리 중..."
                    : !agree1 || !agree2 ? "약관에 동의해주세요"
                    : `${total.toLocaleString()}원 결제하기`}
                </button>
                <p className="mt-2.5 text-[11.5px] text-gray-400 text-center">결제 후 취소는 공연일 24시간 전까지 가능</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}