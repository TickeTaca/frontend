// src/pages/waiting/WaitingPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWaitingStore } from "../../store/waiting.store";

// ── 더미 대기 상태
const DUMMY_WAITING = {
  eventTitle: "아이유 THE GOLDEN HOUR WORLD TOUR",
  eventInfo: "2025.08.16 (토) 오후 7:00 · 잠실 올림픽주경기장",
  position: 3247,
  totalWaiting: 14200,
  estimatedMin: 14,
  estimatedSec: 32,
  remainingSeats: 41079,
};

const STEPS = ["대기열 입장", "대기 중", "좌석 선택", "결제"] as const;

export default function WaitingPage() {
  const navigate = useNavigate();
  const { isInQueue, eventId: queueEventId, leaveQueue } = useWaitingStore();

  const { position, totalWaiting, estimatedMin, estimatedSec, remainingSeats } =
    DUMMY_WAITING;

  const ahead = position - 1;
  const progressPct = Math.min(
    100,
    Math.round(((totalWaiting - position) / totalWaiting) * 100)
  );

  useEffect(() => {
    if (!isInQueue) {
      navigate(queueEventId ? `/event/${queueEventId}` : "/", { replace: true });
      return;
    }
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleCancel = () => {
    if (window.confirm("대기열에서 이탈하시겠습니까? 현재 순번을 잃게 됩니다.")) {
      leaveQueue();
      navigate(`/event/${queueEventId}`);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-50px)]">
      <div className="max-w-[680px] mx-auto px-6 py-10 text-center">

        {/* 4단계 스텝 */}
        <div className="flex justify-between mb-9 relative">
        {/*전체 배경 선*/}
        <div className="absolute top-[13px] left-[14px] right-[14px] h-0.5 bg-gray-200" />
        {/*완료 구간 선*/}
        <div className="absolute top-[13px] left-[14px] right-[14px] w-[calc(33.3%-14px)] h-0.5 bg-[#1a6ad4]" />

          {STEPS.map((step, i) => {
            const isDone = i === 0;
            const isActive = i === 1;

            return (
              <div key={step} className="flex flex-col items-center gap-1.5 z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
                  isDone ? "bg-[#1a6ad4] text-white"
                  : isActive ? "bg-[#f05a00] text-white ring-4 ring-orange-100"
                  : "bg-gray-200 text-gray-400"
                }`}>
                  {isDone ? "✓" : i + 1}
                </div>
                <span className={`text-[11px] ${
                  isDone ? "text-[#1a6ad4]"
                  : isActive ? "text-[#f05a00] font-medium"
                  : "text-gray-400"
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* 대기 카드 */}
        <div className="bg-blue-50 border-2 border-[#1a6ad4] rounded-xl px-12 py-9 mb-7">
          <p className="text-[15px] font-medium text-blue-900 mb-1.5">
            {DUMMY_WAITING.eventTitle}
          </p>
          <p className="text-[13px] text-gray-400 mb-7">
            {DUMMY_WAITING.eventInfo}
          </p>
          <p className="text-[13px] text-gray-500 mb-1">현재 대기 순번</p>
          <div className="text-[72px] font-bold text-[#1a6ad4] leading-none tracking-[-2px]">
            {position.toLocaleString()}
            <span className="text-[20px] text-gray-400 font-normal"> 번</span>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="mb-5">
          <div className="flex justify-between text-[12.5px] text-gray-500 mb-1.5">
            <span>내 순번까지 소진된 대기</span>
            <span className="font-bold text-[#1a6ad4]">
              앞 {ahead.toLocaleString()}명 처리 완료 시 입장
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-[#1a6ad4] rounded transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[11.5px] text-gray-400 mt-1.5">
            <span>대기 시작</span>
            <span>내 순번 ({position.toLocaleString()}번)</span>
          </div>
        </div>

        {/* 통계 3칸 */}
        <div className="grid grid-cols-3 border border-gray-200 rounded-lg overflow-hidden mb-5">
          <div className="py-4 text-center border-r border-gray-200">
            <p className="text-[11.5px] text-gray-400 mb-1.5">예상 대기 시간</p>
            <p className="text-[22px] font-bold">
              {estimatedMin}
              <small className="text-[12px] font-normal text-gray-400">분</small>
              {" "}
              {estimatedSec}
              <small className="text-[12px] font-normal text-gray-400">초</small>
            </p>
          </div>
          <div className="py-4 text-center border-r border-gray-200">
            <p className="text-[11.5px] text-gray-400 mb-1.5">내 앞 대기 인원</p>
            <p className="text-[22px] font-bold">
              {ahead.toLocaleString()}
              <small className="text-[12px] font-normal text-gray-400">명</small>
            </p>
          </div>
          <div className="py-4 text-center">
            <p className="text-[11.5px] text-gray-400 mb-1.5">🔴 남은 좌석 수</p>
            <p className="text-[22px] font-bold text-[#f05a00]">
              {remainingSeats.toLocaleString()}
              <small className="text-[12px] font-normal text-gray-400">석</small>
            </p>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-orange-50 border border-orange-200 rounded-md px-4 py-3 text-[12.5px] text-[#f05a00] leading-[1.7] text-left mb-4">
          <strong className="block mb-1">⚠ 대기 중 주의사항</strong>
          이 페이지를 벗어나거나 새로고침해도 대기 순번은 유지됩니다. (대기 토큰 쿠키 저장)<br />
          브라우저를 완전히 종료한 경우 재접속 시 자동 복귀합니다. 토큰 유효시간: 30분<br />
          순번 도달 시 자동으로 좌석 선택 페이지로 이동합니다.
          입장 토큰 유효시간: <strong>10분</strong>
        </div>

        <button
          onClick={() => {
            leaveQueue();
            navigate(`/event/${queueEventId}`);
          }}
          className="w-full py-2.5 border border-gray-300 text-gray-500 rounded hover:bg-gray-50 text-[13.5px] transition mb-2"
        >
          ← 이벤트 상세로 돌아가기
        </button>

        {/* 대기 취소 버튼 */}
        <button
          onClick={handleCancel}
          className="w-full py-2.5 border border-red-400 text-red-500 rounded hover:bg-red-50 text-[13.5px] transition"
        >
          대기 취소 (순번 포기)
        </button>

      </div>
    </div>
  );
}