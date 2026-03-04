// src/pages/event/EventDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ── 더미 데이터 (HomePage와 동일한 구조)
type EventStatus = "open" | "soon" | "closing" | "available";
type Category = "concert" | "musical" | "sports" | "exhibition";

interface Section {
  name: string;
  price: number;
  type: string;
  total: number;
  remaining: number;
}

interface DummyEvent {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  ageLimit: string;
  priceMin: number;
  priceMax: number;
  emoji: string;
  status: EventStatus;
  category: Category;
  categoryLabel: string;
  bookingOpenAt: Date;
  description: string;
  sections: Section[];
}

const DUMMY_EVENTS: DummyEvent[] = [
  {
    id: 1,
    title: "아이유 THE GOLDEN HOUR WORLD TOUR",
    subtitle: "2025 서울 공연",
    date: "2025.08.16 (토) – 08.17 (일)",
    time: "오후 7:00",
    venue: "잠실 올림픽주경기장",
    ageLimit: "전체 관람가",
    priceMin: 88000,
    priceMax: 132000,
    emoji: "🎸",
    status: "soon",
    category: "concert",
    categoryLabel: "콘서트",
    bookingOpenAt: new Date(Date.now() + 1000 * 60 * 60 * 71 + 1000 * 60 * 23 + 1000 * 41), // 71h 23m 41s 후
    description:
      "아이유의 두 번째 월드 투어 「THE GOLDEN HOUR」가 서울을 찾아옵니다.\n※ 공연 시작 30분 전까지 입장  ※ 음식물 반입 금지  ※ 촬영/녹음 금지",
    sections: [
      { name: "A구역 (스탠딩)", price: 132000, type: "스탠딩", total: 10000, remaining: 10000 },
      { name: "B구역 (지정석)", price: 99000, type: "지정석", total: 20000, remaining: 20000 },
      { name: "C구역 (지정석)", price: 77000, type: "지정석", total: 15000, remaining: 15000 },
      { name: "D구역 (지정석)", price: 55000, type: "지정석", total: 5000, remaining: 5000 },
    ],
  },
  {
    id: 2,
    title: "레미제라블 내한공연 2025",
    subtitle: "Les Misérables — The Original Production",
    date: "2025.09.01 – 11.30",
    time: "화~금 오후 7:30 / 토·일 오후 2:00, 7:00",
    venue: "블루스퀘어 신한카드홀",
    ageLimit: "8세 이상",
    priceMin: 70000,
    priceMax: 170000,
    emoji: "🎭",
    status: "open",
    category: "musical",
    categoryLabel: "뮤지컬",
    bookingOpenAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    description:
      "세계 최장기 공연 뮤지컬 레미제라블이 새로운 프로덕션으로 한국을 찾습니다.\n※ 8세 미만 입장 불가  ※ 공연 중 사진 촬영 금지",
    sections: [
      { name: "VIP석", price: 170000, type: "지정석", total: 500, remaining: 120 },
      { name: "R석", price: 140000, type: "지정석", total: 800, remaining: 310 },
      { name: "S석", price: 110000, type: "지정석", total: 1200, remaining: 890 },
      { name: "A석", price: 70000, type: "지정석", total: 600, remaining: 540 },
    ],
  },
  {
    id: 3,
    title: "한국시리즈 3차전 두산 vs LG",
    subtitle: "2025 KBO 한국시리즈",
    date: "2025.10.21 (화)",
    time: "오후 6:30",
    venue: "잠실야구장",
    ageLimit: "전체 관람가",
    priceMin: 10000,
    priceMax: 50000,
    emoji: "⚾",
    status: "closing",
    category: "sports",
    categoryLabel: "스포츠",
    bookingOpenAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    description:
      "2025 KBO 한국시리즈 3차전. 잠실에서 펼쳐지는 두산-LG의 역대급 맞대결!\n※ 입장 시 신분증 지참  ※ 외부 음식 반입 가능",
    sections: [
      { name: "테이블석", price: 50000, type: "지정석", total: 200, remaining: 12 },
      { name: "내야 지정석", price: 25000, type: "지정석", total: 5000, remaining: 84 },
      { name: "외야 지정석", price: 15000, type: "지정석", total: 3000, remaining: 230 },
      { name: "외야 자유석", price: 10000, type: "자유석", total: 2000, remaining: 650 },
    ],
  },
  {
    id: 4,
    title: "세계 록 페스티벌 2025 서울",
    subtitle: "World Rock Festival Seoul",
    date: "2025.09.06 (토) – 09.07 (일)",
    time: "오후 4:00 (2일간)",
    venue: "서울월드컵경기장",
    ageLimit: "19세 이상",
    priceMin: 99000,
    priceMax: 180000,
    emoji: "🎤",
    status: "available",
    category: "concert",
    categoryLabel: "콘서트",
    bookingOpenAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    description:
      "세계적인 록 밴드들이 한자리에 모이는 대형 야외 페스티벌.\n※ 19세 미만 입장 불가  ※ 우천 시에도 공연 진행  ※ 1일권/2일권 별도 판매",
    sections: [
      { name: "2일권 VIP (앞자리)", price: 180000, type: "지정석", total: 1000, remaining: 430 },
      { name: "2일권 일반", price: 140000, type: "자유석", total: 5000, remaining: 2100 },
      { name: "1일권 토요일", price: 99000, type: "자유석", total: 3000, remaining: 1800 },
      { name: "1일권 일요일", price: 99000, type: "자유석", total: 3000, remaining: 2400 },
    ],
  },
  {
    id: 5,
    title: "오페라의 유령 25주년 기념공연",
    subtitle: "The Phantom of the Opera — 25th Anniversary",
    date: "2025.11.01 – 11.30",
    time: "화~금 오후 8:00 / 토·일 오후 3:00, 8:00",
    venue: "샤롯데씨어터",
    ageLimit: "8세 이상",
    priceMin: 80000,
    priceMax: 200000,
    emoji: "🎩",
    status: "soon",
    category: "musical",
    categoryLabel: "뮤지컬",
    bookingOpenAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
    description:
      "웨스트엔드 오리지널 오페라의 유령 25주년 기념 특별 프로덕션.\n※ 8세 미만 입장 불가  ※ 공연 중 촬영 및 녹음 엄금",
    sections: [
      { name: "VIP석", price: 200000, type: "지정석", total: 300, remaining: 300 },
      { name: "R석", price: 150000, type: "지정석", total: 600, remaining: 600 },
      { name: "S석", price: 120000, type: "지정석", total: 900, remaining: 900 },
      { name: "A석", price: 80000, type: "지정석", total: 400, remaining: 400 },
    ],
  },
  {
    id: 8,
    title: "BTS 진 솔로 콘서트 TOUR",
    subtitle: "JIN — HAPPY",
    date: "2025.12.20 (토) – 12.21 (일)",
    time: "오후 6:00",
    venue: "고척스카이돔",
    ageLimit: "전체 관람가",
    priceMin: 99000,
    priceMax: 165000,
    emoji: "🌟",
    status: "soon",
    category: "concert",
    categoryLabel: "콘서트",
    bookingOpenAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    description:
      "군 전역 후 첫 번째 솔로 콘서트. 진과 함께하는 특별한 밤.\n※ 공연 시작 1시간 전 입장 권장  ※ 응원봉 반입 가능",
    sections: [
      { name: "ARMY ZONE (스탠딩)", price: 165000, type: "스탠딩", total: 5000, remaining: 5000 },
      { name: "지정석 1층", price: 143000, type: "지정석", total: 8000, remaining: 8000 },
      { name: "지정석 2층", price: 110000, type: "지정석", total: 4000, remaining: 4000 },
      { name: "지정석 3층", price: 99000, type: "지정석", total: 2000, remaining: 2000 },
    ],
  },
];

// ── 카운트다운 훅
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return { d, h, m, s, isOpen: diff === 0 };
  };

  const [countdown, setCountdown] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calc()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return countdown;
}

// ── 구역 잔여석 색상
function remainColor(remaining: number, total: number) {
  const pct = remaining / total;
  if (remaining === 0) return "text-red-600";
  if (pct < 0.2) return "text-[#f05a00]";
  return "text-green-600";
}

function remainBar(remaining: number, total: number) {
  const soldPct = ((total - remaining) / total) * 100;
  if (remaining === 0) return "bg-red-500";
  if (soldPct > 80) return "bg-[#f05a00]";
  return "bg-green-500";
}

type TabKey = "info" | "seat" | "notice" | "venue";

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: "info", label: "공연 정보" },
  { key: "seat", label: "좌석 배치도" },
  { key: "notice", label: "예매 안내" },
  { key: "venue", label: "공연장 안내" },
];

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("info");

  const event = DUMMY_EVENTS.find((e) => e.id === Number(eventId));
  const countdown = useCountdown(event?.bookingOpenAt ?? new Date());

  if (!event) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 text-[14px]">
        이벤트를 찾을 수 없습니다.
      </div>
    );
  }

  const isOpen = event.status === "open" || event.status === "closing" || event.status === "available";

  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-5 pb-10">
        <div className="grid grid-cols-[1fr_340px] gap-6">

          {/* ── 왼쪽 */}
          <div>
            {/* 기본 정보 카드 */}
            <div className="bg-white border border-gray-200 rounded-md p-6 flex gap-6 mb-4">
              {/* 포스터 */}
              <div className="w-[160px] flex-shrink-0 aspect-[3/4] bg-[#dde4f0] rounded flex items-center justify-center text-[48px]">
                {event.emoji}
              </div>

              {/* 정보 */}
              <div className="flex-1">
                <span className="inline-block bg-blue-100 text-[#1a6ad4] text-[11px] font-bold px-2 py-[3px] rounded mb-2.5">
                  {event.categoryLabel}
                </span>
                <h1 className="text-[22px] font-bold leading-[1.3] mb-1">
                  {event.title}
                </h1>
                <p className="text-[14px] text-gray-500 mb-4">{event.subtitle}</p>

                <div className="flex flex-col gap-[7px] mb-5">
                  {[
                    ["기간", event.date],
                    ["시간", event.time],
                    ["장소", event.venue],
                    ["관람연령", event.ageLimit],
                    ["가격", `${event.priceMin.toLocaleString()}원 ~ ${event.priceMax.toLocaleString()}원`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex text-[13px]">
                      <span className="w-[64px] text-gray-400 shrink-0">{label}</span>
                      <span className={label === "가격" ? "text-[#f05a00] font-bold" : ""}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={!isOpen}
                    onClick={() => navigate("/waiting")}
                    className={`flex-1 py-2.5 rounded font-bold text-[15px] transition ${
                      isOpen
                        ? "bg-[#1a6ad4] text-white hover:bg-[#1458b0]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isOpen ? "예매하기 →" : "예매 오픈 전"}
                  </button>
                  <button className="px-4 py-2.5 border border-gray-200 rounded text-[13.5px] text-gray-600 hover:border-blue-400 hover:text-[#1a6ad4]">
                    ♡ 찜
                  </button>
                  <button className="px-4 py-2.5 border border-gray-200 rounded text-[13.5px] text-gray-600 hover:border-blue-400 hover:text-[#1a6ad4]">
                    📤 공유
                  </button>
                </div>
              </div>
            </div>

            {/* 탭 */}
            <div className="flex bg-white rounded-t-md border border-gray-200">
              {TAB_LABELS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-3 text-[13.5px] border-b-2 transition font-medium ${
                    activeTab === key
                      ? "text-[#1a6ad4] border-[#1a6ad4]"
                      : "text-gray-500 border-transparent hover:text-[#1a6ad4]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-200 border-t-0 rounded-b-md p-5 text-[13px] text-gray-700 leading-[1.8] min-h-[80px]">
              {activeTab === "info" && (
                <p className="whitespace-pre-line">{event.description}</p>
              )}
              {activeTab === "seat" && (
                <p className="text-gray-400">좌석 배치도 이미지 영역 — 준비 중입니다.</p>
              )}
              {activeTab === "notice" && (
                <ul className="list-disc list-inside flex flex-col gap-1.5">
                  <li>예매는 1인 최대 4매까지 가능합니다.</li>
                  <li>취소/환불은 공연일 24시간 전까지 가능합니다.</li>
                  <li>티켓 수령 방법: 현장 수령 또는 모바일 티켓</li>
                  <li>미성년자 입장 시 보호자 동반이 필요할 수 있습니다.</li>
                </ul>
              )}
              {activeTab === "venue" && (
                <ul className="list-disc list-inside flex flex-col gap-1.5">
                  <li>주소: {event.venue}</li>
                  <li>주차: 현장 주차 가능 (유료, 대중교통 이용 권장)</li>
                  <li>인근 지하철: 가장 가까운 역에서 도보 이용</li>
                </ul>
              )}
            </div>
          </div>

          {/* ── 오른쪽 사이드바 */}
          <div>
            {isOpen ? (
              /* 오픈 후: 예매 진행 중 */
              <div className="bg-white border-2 border-[#1a6ad4] rounded-md overflow-hidden">
                <div className="bg-[#1a6ad4] text-white px-[18px] py-[14px] text-[14px] font-bold flex items-center justify-between">
                  예매 진행 중
                  <span className="text-[11px] bg-white/20 px-2 py-[3px] rounded-full flex items-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-green-400 inline-block animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="p-[18px]">
                  {/* 기본 정보 */}
                  <div className="flex flex-col gap-[7px] mb-[14px] text-[13px]">
                    {[
                      ["공연일", event.date],
                      ["취소 기한", "공연일 24시간 전까지"],
                      ["가격 범위", `${event.priceMin.toLocaleString()} – ${event.priceMax.toLocaleString()}원`],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between py-[7px] border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-400">{label}</span>
                        <span className={`font-medium ${label === "가격 범위" ? "text-[#f05a00] text-[16px]" : ""}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 구역별 잔여 좌석 */}
                  <div className="bg-gray-50 rounded-md p-3 mb-4">
                    <p className="text-[12px] font-medium text-gray-500 mb-2.5 uppercase tracking-wide">
                      구역별 잔여 좌석 (실시간)
                    </p>
                    <div className="flex flex-col gap-2">
                      {event.sections.map((sec) => {
                        const soldPct = ((sec.total - sec.remaining) / sec.total) * 100;
                        return (
                          <div key={sec.name}>
                            <div className="flex justify-between text-[12.5px] mb-[3px]">
                              <span>{sec.name} {sec.price.toLocaleString()}원</span>
                              <span className={`font-medium ${remainColor(sec.remaining, sec.total)}`}>
                                {sec.remaining === 0
                                  ? "매진"
                                  : `${sec.remaining.toLocaleString()} / ${sec.total.toLocaleString()}`}
                              </span>
                            </div>
                            <div className="h-[5px] bg-gray-200 rounded overflow-hidden">
                              <div
                                className={`h-full rounded ${remainBar(sec.remaining, sec.total)}`}
                                style={{ width: `${soldPct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/waiting")}
                    className="w-full py-[14px] bg-[#1a6ad4] text-white rounded font-bold text-[16px] hover:bg-[#1458b0]"
                  >
                    예매하기 →
                  </button>
                  <p className="mt-2.5 text-[11.5px] text-gray-400 text-center leading-[1.7]">
                    클릭 시 대기열에 자동 배치됩니다<br />
                    로그인이 필요합니다
                  </p>
                </div>
              </div>
            ) : (
              /* 오픈 전: 카운트다운 */
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-[#1a6ad4] text-white px-[18px] py-[14px] text-[14px] font-bold">
                  예매 오픈 일정
                </div>

                <div className="p-[18px]">
                  {/* D-n + 시분초 */}
                  <div className="text-center mb-5">
                    <p className="text-[12px] text-gray-400 mb-2">예매 오픈까지</p>
                    <p className="text-[48px] font-bold text-[#1a6ad4] tracking-[-2px] leading-none">
                      D-{countdown.d}
                    </p>
                    <p className="text-[13px] text-gray-400 mt-1.5">
                      {event.bookingOpenAt.toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { label: "시간", value: countdown.h },
                      { label: "분", value: countdown.m },
                      { label: "초", value: countdown.s },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-blue-50 rounded-md py-3 text-center">
                        <p className="text-[28px] font-bold text-[#1a6ad4] leading-none">
                          {String(value).padStart(2, "0")}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* 공연 기본 정보 */}
                  <div className="flex flex-col gap-[7px] mb-4 text-[13px]">
                    {[
                      ["공연일", event.date],
                      ["장소", event.venue],
                      ["가격 범위", `${event.priceMin.toLocaleString()} – ${event.priceMax.toLocaleString()}원`],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between py-[7px] border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-400">{label}</span>
                        <span className={`font-medium ${label === "가격 범위" ? "text-[#f05a00]" : ""}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 구역별 잔여 좌석 (오픈 전 — 전체 표시) */}
                  <div className="bg-gray-50 rounded-md p-3 mb-4">
                    <p className="text-[12px] font-medium text-gray-500 mb-2.5 uppercase tracking-wide">
                      구역별 좌석 수
                    </p>
                    <div className="flex flex-col gap-[7px]">
                      {event.sections.map((sec) => (
                        <div key={sec.name} className="flex justify-between text-[12.5px]">
                          <span>{sec.name}</span>
                          <span className="text-green-600 font-medium">
                            {sec.total.toLocaleString()} / {sec.total.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full py-[13px] bg-gray-300 text-gray-500 rounded font-bold text-[15px] cursor-not-allowed"
                  >
                    예매 오픈 전입니다
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}