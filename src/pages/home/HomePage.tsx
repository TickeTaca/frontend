// src/pages/home/HomePage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import type { EventStatus } from "../../components/EventCard";
import { useCategoryStore } from "../../store/category.store";

type Category = "all" | "concert" | "musical" | "sports" | "exhibition";
type SortKey = "openDate" | "eventDate";
type StatusFilter = "all" | "soon" | "open" | "closing";

interface DummyEvent {
  id: number;
  title: string;
  date: string;
  venue: string;
  emoji: string;
  status: EventStatus;
  badgeText: string;
  category: Category;
  openDate: string; // YYYY-MM-DD (정렬용)
  eventDate: string;
}

const DUMMY_EVENTS: DummyEvent[] = [
  {
    id: 1,
    title: "아이유 THE GOLDEN HOUR WORLD TOUR",
    date: "2025.08.16–17",
    venue: "잠실 올림픽주경기장",
    emoji: "🎸",
    status: "soon",
    badgeText: "D-3 오픈",
    category: "concert",
    openDate: "2025-07-05",
    eventDate: "2025-08-16",
  },
  {
    id: 2,
    title: "레미제라블 내한공연 2025",
    date: "2025.09–11",
    venue: "블루스퀘어 신한카드홀",
    emoji: "🎭",
    status: "open",
    badgeText: "예매중",
    category: "musical",
    openDate: "2025-06-20",
    eventDate: "2025-09-01",
  },
  {
    id: 3,
    title: "한국시리즈 3차전 두산 vs LG",
    date: "2025.10.21",
    venue: "잠실야구장",
    emoji: "⚾",
    status: "closing",
    badgeText: "마감임박",
    category: "sports",
    openDate: "2025-09-01",
    eventDate: "2025-10-21",
  },
  {
    id: 4,
    title: "세계 록 페스티벌 2025 서울",
    date: "2025.09.06–07",
    venue: "서울월드컵경기장",
    emoji: "🎤",
    status: "available",
    badgeText: "예매가능",
    category: "concert",
    openDate: "2025-07-12",
    eventDate: "2025-09-06",
  },
  {
    id: 5,
    title: "오페라의 유령 25주년 기념공연",
    date: "2025.11.01–30",
    venue: "샤롯데씨어터",
    emoji: "🎩",
    status: "soon",
    badgeText: "오픈예정",
    category: "musical",
    openDate: "2025-08-01",
    eventDate: "2025-11-01",
  },
  {
    id: 6,
    title: "2025 K리그 파이널 결승전",
    date: "2025.11.30",
    venue: "서울월드컵경기장",
    emoji: "⚽",
    status: "available",
    badgeText: "예매가능",
    category: "sports",
    openDate: "2025-10-01",
    eventDate: "2025-11-30",
  },
  {
    id: 7,
    title: "반 고흐 빛과 색채 특별전",
    date: "2025.08.01–10.31",
    venue: "예술의전당 한가람미술관",
    emoji: "🖼️",
    status: "open",
    badgeText: "예매중",
    category: "exhibition",
    openDate: "2025-07-15",
    eventDate: "2025-08-01",
  },
  {
    id: 8,
    title: "BTS 진 솔로 콘서트 TOUR",
    date: "2025.12.20–21",
    venue: "고척스카이돔",
    emoji: "🌟",
    status: "soon",
    badgeText: "D-10 오픈",
    category: "concert",
    openDate: "2025-09-20",
    eventDate: "2025-12-20",
  },
  {
    id: 9,
    title: "시카고 뮤지컬 2025",
    date: "2025.10.10–12.28",
    venue: "디큐브 링크아트센터",
    emoji: "🎷",
    status: "open",
    badgeText: "예매중",
    category: "musical",
    openDate: "2025-09-10",
    eventDate: "2025-10-10",
  },
  {
    id: 10,
    title: "2025 KLPGA 투어 파이널",
    date: "2025.11.13–16",
    venue: "인천 스카이72 골프클럽",
    emoji: "⛳",
    status: "available",
    badgeText: "예매가능",
    category: "sports",
    openDate: "2025-10-10",
    eventDate: "2025-11-13",
  },
  {
    id: 11,
    title: "모네 수련 기획전 — 빛을 담다",
    date: "2025.09.15–2026.01.15",
    venue: "국립현대미술관 서울관",
    emoji: "🎨",
    status: "soon",
    badgeText: "오픈예정",
    category: "exhibition",
    openDate: "2025-08-15",
    eventDate: "2025-09-15",
  },
  {
    id: 12,
    title: "블랙핑크 WORLD TOUR 2025",
    date: "2025.10.04–05",
    venue: "KSPO DOME",
    emoji: "💎",
    status: "closing",
    badgeText: "마감임박",
    category: "concert",
    openDate: "2025-08-10",
    eventDate: "2025-10-04",
  },
];

export default function HomePage() {
  const { category } = useCategoryStore();
  const navigate = useNavigate();

  const [sort, setSort] = useState<SortKey>("openDate");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    let list = DUMMY_EVENTS;

    // 카테고리 필터 (CategoryBar)
    if (category !== "all") {
      list = list.filter((e) => e.category === category);
    }

    // 상태 필터
    if (statusFilter !== "all") {
      list = list.filter((e) => e.status === statusFilter);
    }

    // 정렬
    list = [...list].sort((a, b) => {
      const key = sort === "openDate" ? "openDate" : "eventDate";
      return a[key].localeCompare(b[key]);
    });

    return list;
  }, [category, statusFilter, sort]);

  // 배너는 항상 id=1 고정
  const bannerEvent = DUMMY_EVENTS[0];

  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-5 pb-10">

        {/* 검색 */}
        <div className="bg-white border-2 border-[#1a6ad4] rounded-md flex items-center overflow-hidden mb-5">
          <select className="h-[46px] px-4 text-[13px] bg-[#fafafa] border-r border-gray-200 outline-none min-w-[100px]">
            <option>공연명</option>
            <option>아티스트</option>
            <option>장소</option>
          </select>

          <input
            type="text"
            placeholder="공연명, 아티스트, 장소를 검색하세요"
            className="flex-1 h-[46px] px-4 text-[14px] outline-none"
          />

          <button className="w-[56px] h-[46px] bg-[#1a6ad4] text-white text-[18px]">
            🔍
          </button>
        </div>

        {/* 필터/정렬 바 */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="h-[34px] px-3 text-[12.5px] border border-gray-300 rounded bg-white"
          >
            <option value="all">전체 상태</option>
            <option value="soon">예매 예정</option>
            <option value="open">예매 진행중</option>
            <option value="closing">마감임박</option>
            <option value="available">예매가능</option>
          </select>

          <input
            type="date"
            className="h-[34px] px-2 text-[12.5px] border border-gray-300 rounded w-[130px]"
          />
          <span className="text-[12px] text-gray-400">~</span>
          <input
            type="date"
            className="h-[34px] px-2 text-[12.5px] border border-gray-300 rounded w-[130px]"
          />

          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setSort("openDate")}
              className={`h-[34px] px-3 text-[12.5px] border border-gray-300 rounded font-medium ${
                sort === "openDate"
                  ? "bg-[#e8f0fd] text-[#1a6ad4]"
                  : "bg-white text-gray-500"
              }`}
            >
              예매 오픈일 순
            </button>
            <button
              onClick={() => setSort("eventDate")}
              className={`h-[34px] px-3 text-[12.5px] border border-gray-300 rounded ${
                sort === "eventDate"
                  ? "bg-[#e8f0fd] text-[#1a6ad4] font-medium"
                  : "bg-white text-gray-500"
              }`}
            >
              공연일 순
            </button>
          </div>
        </div>

        {/* 메인 배너 */}
        <div className="relative bg-gradient-to-br from-[#1458b0] to-[#2979e8] rounded-lg h-[220px] flex items-center px-10 mb-6 overflow-hidden">
          <div>
            <div className="bg-[#f05a00] text-white text-[11px] font-bold px-3 py-1 rounded-full inline-block mb-3">
              🔥 HOT 예매 오픈
            </div>
            <div className="text-[26px] font-bold text-white mb-2 leading-[1.3]">
              {bannerEvent.title}
            </div>
            <div className="text-[13.5px] text-white/75 mb-5">
              {bannerEvent.date} · {bannerEvent.venue}
            </div>
            <button
              onClick={() => navigate(`/event/${bannerEvent.id}`)}
              className="bg-white text-[#1a6ad4] text-[13.5px] font-bold px-5 py-2 rounded hover:bg-blue-50"
            >
              예매하기 →
            </button>
          </div>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 right-5 flex gap-1">
            <div className="w-[20px] h-[7px] rounded bg-white" />
            <div className="w-[7px] h-[7px] rounded-full bg-white/40" />
            <div className="w-[7px] h-[7px] rounded-full bg-white/40" />
          </div>
        </div>

        {/* 메인 그리드 */}
        <div className="grid grid-cols-[1fr_280px] gap-5">

          {/* 좌측 — 이벤트 목록 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-[16px] bg-[#1a6ad4] rounded" />
                <h2 className="text-[16px] font-bold text-gray-900">
                  {category === "all"
                    ? "전체 공연"
                    : { concert: "콘서트", musical: "뮤지컬", sports: "스포츠", exhibition: "전시" }[category]}
                </h2>
                <span className="text-[13px] text-gray-400">
                  {filtered.length}건
                </span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-md py-16 text-center text-gray-400 text-[14px]">
                해당 조건의 공연이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 mb-6">
                {filtered.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    venue={event.venue}
                    emoji={event.emoji}
                    status={event.status}
                    badgeText={event.badgeText}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 우측 패널 */}
          <div>
            {/* 공지사항 */}
            <div className="bg-white border border-gray-200 rounded-md mb-4 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b text-[13.5px] font-bold">
                공지사항
                <button className="text-[11px] text-[#1a6ad4] font-normal">
                  더보기 ›
                </button>
              </div>
              <div className="py-2">
                <div className="px-4 py-2 text-[12.5px] flex gap-2 cursor-pointer hover:bg-gray-50">
                  <span className="bg-[#fff3ec] text-[#f05a00] text-[10px] font-bold px-2 py-[2px] rounded shrink-0">
                    공지
                  </span>
                  시스템 점검 안내 (07/20)
                </div>
                <div className="px-4 py-2 text-[12.5px] flex gap-2 cursor-pointer hover:bg-gray-50">
                  <span className="bg-[#e8f0fd] text-[#1a6ad4] text-[10px] font-bold px-2 py-[2px] rounded shrink-0">
                    이벤트
                  </span>
                  여름 특별 할인 이벤트
                </div>
              </div>
            </div>

            {/* 예매 오픈 예정 */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b text-[13.5px] font-bold">
                예매 오픈 예정
              </div>
              <div className="py-2">
                {DUMMY_EVENTS.filter((e) => e.status === "soon")
                  .slice(0, 4)
                  .map((e, i, arr) => (
                    <div
                      key={e.id}
                      onClick={() => navigate(`/event/${e.id}`)}
                      className={`px-4 py-2.5 cursor-pointer hover:bg-gray-50 ${
                        i < arr.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <div className="text-[13px] font-medium mb-0.5 truncate">
                        {e.title}
                      </div>
                      <div className="text-[11.5px] text-[#f05a00] font-medium">
                        {e.openDate.replace(/-/g, ".").slice(5)} 오픈
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}