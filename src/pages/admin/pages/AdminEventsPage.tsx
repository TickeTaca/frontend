// src/pages/admin/pages/AdminEventsPage.tsx
import { useState } from "react";

type EventStatus = "live" | "soon" | "stopped";
type Tab = "list" | "create";

interface AdminEvent {
  id: string;
  title: string;
  category: string;
  categoryCls: string;
  date: string;
  openAt: string;
  soldRate: number | null;
  status: EventStatus;
}

const EVENTS: AdminEvent[] = [
  { id: "E-001", title: "아이유 THE GOLDEN HOUR WORLD TOUR", category: "콘서트", categoryCls: "bg-blue-100 text-blue-700",  date: "2025.08.16–17", openAt: "07.05 10:00", soldRate: 17.8, status: "live" },
  { id: "E-002", title: "서울시향 신년음악회",                 category: "클래식", categoryCls: "bg-gray-100 text-gray-600",  date: "2025.12.31",   openAt: "08.01 14:00", soldRate: null, status: "soon" },
  { id: "E-003", title: "레미제라블 내한공연 2025",             category: "뮤지컬", categoryCls: "bg-blue-100 text-blue-700",  date: "2025.09–11",   openAt: "완료",        soldRate: 61.2, status: "live" },
];

const STATUS_MAP: Record<EventStatus, { label: string; cls: string }> = {
  live:    { label: "● 예매중",  cls: "bg-blue-100 text-[#1a6ad4]"  },
  soon:    { label: "오픈예정",  cls: "bg-gray-100 text-gray-500"    },
  stopped: { label: "예매중지",  cls: "bg-red-100 text-red-600"      },
};

// 이벤트 등록 폼 — 가격 등급
interface Tier { name: string; price: string; }
// 이벤트 등록 폼 — 좌석 구역
interface Zone { name: string; rows: string; cols: string; tier: string; }

export default function AdminEventsPage() {
  const [tab,    setTab]    = useState<Tab>("list");
  const [search, setSearch] = useState("");

  // 등록 폼 상태
  const [tiers, setTiers] = useState<Tier[]>([{ name: "", price: "" }, { name: "", price: "" }]);
  const [zones, setZones] = useState<Zone[]>([{ name: "", rows: "", cols: "", tier: "VIP" }]);

  const filtered = EVENTS.filter((e) =>
    search === "" || e.title.includes(search)
  );

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold">이벤트 관리</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">이벤트 등록 · 수정 · 상태 변경</p>
        </div>
        <button
          onClick={() => setTab("create")}
          className="px-4 py-2 bg-[#1a6ad4] text-white text-[13px] font-bold rounded hover:bg-[#1458b0]"
        >
          + 이벤트 등록
        </button>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-200">
        {([["list", "이벤트 목록"], ["create", "이벤트 등록"]] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2.5 text-[13.5px] font-medium border-b-2 transition ${
              tab === key
                ? "border-[#1a6ad4] text-[#1a6ad4]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "list" && (
        <>
          {/* 검색/필터 */}
          <div className="bg-white border border-gray-200 rounded-md p-4 flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이벤트명 검색"
              className="flex-1 h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
            />
            <select className="w-[130px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none">
              <option>전체 카테고리</option>
              <option>콘서트</option><option>뮤지컬</option><option>스포츠</option><option>클래식</option>
            </select>
            <select className="w-[120px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none">
              <option>전체 상태</option>
              <option>예매중</option><option>오픈예정</option><option>예매중지</option><option>종료</option>
            </select>
            <button className="px-4 h-9 bg-[#1a6ad4] text-white rounded text-[13px] shrink-0 hover:bg-[#1458b0]">
              검색
            </button>
          </div>

          {/* 이벤트 목록 테이블 */}
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">
              이벤트 목록{" "}
              <span className="text-[12px] font-normal text-gray-400">총 {filtered.length}건</span>
            </div>
            <table className="w-full text-[12.5px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID", "이벤트명", "카테고리", "공연일", "예매오픈", "판매율", "상태", "관리"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((ev) => {
                  const st = STATUS_MAP[ev.status];
                  return (
                    <tr key={ev.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-[12px] text-gray-400">{ev.id}</td>
                      <td className="px-4 py-3 font-medium">{ev.title}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11.5px] px-2 py-0.5 rounded ${ev.categoryCls}`}>{ev.category}</span>
                      </td>
                      <td className="px-4 py-3">{ev.date}</td>
                      <td className="px-4 py-3 text-[12px]">{ev.openAt}</td>
                      <td className="px-4 py-3">
                        {ev.soldRate !== null ? (
                          <>
                            <p className="text-[12px] mb-1">{ev.soldRate}%</p>
                            <div className="h-1.5 bg-gray-100 rounded-full w-20">
                              <div
                                className={`h-full rounded-full ${ev.soldRate > 50 ? "bg-[#f05a00]" : "bg-[#1a6ad4]"}`}
                                style={{ width: `${ev.soldRate}%` }}
                              />
                            </div>
                          </>
                        ) : (
                          <span className="text-[12px] text-gray-400">오픈 전</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[11.5px] px-2 py-0.5 rounded font-medium ${st.cls}`}>{st.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button className="px-2 py-1 border border-gray-200 rounded text-[11px] hover:bg-gray-50">
                            수정
                          </button>
                          {ev.status === "live" && (
                            <button className="px-2 py-1 border border-[#f05a00] text-[#f05a00] rounded text-[11px] hover:bg-orange-50">
                              중지
                            </button>
                          )}
                          {ev.status === "soon" && (
                            <button className="px-2 py-1 border border-green-500 text-green-600 rounded text-[11px] hover:bg-green-50">
                              즉시오픈
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "create" && (
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-[15px] font-bold mb-5">이벤트 등록</h2>
          <div className="grid grid-cols-2 gap-4">

            {/* 기본 정보 */}
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">이벤트 제목 *</label>
              <input placeholder="아이유 THE GOLDEN HOUR WORLD TOUR"
                className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]" />
            </div>
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">카테고리 *</label>
              <select className="w-full h-9 px-2 border border-gray-200 rounded text-[13px] outline-none">
                <option>콘서트</option><option>스포츠</option><option>뮤지컬</option><option>클래식</option><option>전시</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">장소명 *</label>
              <input placeholder="잠실 올림픽주경기장"
                className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]" />
            </div>
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">공연 일시 *</label>
              <input type="datetime-local"
                className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]" />
            </div>
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">예매 오픈 일시 *</label>
              <input type="datetime-local" placeholder="현재 시각 이후"
                className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]" />
            </div>
            <div>
              <label className="block text-[12px] text-gray-500 mb-1.5">썸네일 이미지 URL</label>
              <input placeholder="https://..."
                className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] text-gray-500 mb-1.5">공연 설명</label>
              <textarea placeholder="공연 상세 내용" rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4] resize-none" />
            </div>

            {/* 가격 등급 */}
            <div className="col-span-2">
              <label className="block text-[12px] text-gray-500 mb-2">가격 등급 설정 *</label>
              <div className="flex flex-col gap-2">
                {tiers.map((tier, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={tier.name}
                      onChange={(e) => setTiers((prev) => prev.map((t, j) => j === i ? { ...t, name: e.target.value } : t))}
                      placeholder="등급명 (예: VIP)"
                      className="flex-1 h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
                    />
                    <input
                      value={tier.price}
                      onChange={(e) => setTiers((prev) => prev.map((t, j) => j === i ? { ...t, price: e.target.value } : t))}
                      type="number" placeholder="금액 (원)"
                      className="w-[140px] h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
                    />
                    <button
                      onClick={() => setTiers((prev) => prev.filter((_, j) => j !== i))}
                      className="px-3 h-9 border border-gray-200 rounded text-[13px] hover:bg-gray-50"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setTiers((prev) => [...prev, { name: "", price: "" }])}
                  className="h-9 border border-dashed border-gray-300 rounded text-[13px] text-[#1a6ad4] hover:bg-blue-50"
                >
                  + 가격 등급 추가
                </button>
              </div>
            </div>

            {/* 좌석 구역 */}
            <div className="col-span-2">
              <label className="block text-[12px] text-gray-500 mb-2">좌석 구역 설정 * (저장 시 좌석 자동 생성)</label>
              <div className="flex flex-col gap-2">
                {zones.map((zone, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={zone.name}
                      onChange={(e) => setZones((prev) => prev.map((z, j) => j === i ? { ...z, name: e.target.value } : z))}
                      placeholder="구역명 (예: A구역)"
                      className="flex-[2] h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
                    />
                    <input
                      value={zone.rows}
                      onChange={(e) => setZones((prev) => prev.map((z, j) => j === i ? { ...z, rows: e.target.value } : z))}
                      type="number" placeholder="행 수"
                      className="w-[80px] h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
                    />
                    <input
                      value={zone.cols}
                      onChange={(e) => setZones((prev) => prev.map((z, j) => j === i ? { ...z, cols: e.target.value } : z))}
                      type="number" placeholder="열 수"
                      className="w-[80px] h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4]"
                    />
                    <select
                      value={zone.tier}
                      onChange={(e) => setZones((prev) => prev.map((z, j) => j === i ? { ...z, tier: e.target.value } : z))}
                      className="flex-1 h-9 px-2 border border-gray-200 rounded text-[13px] outline-none"
                    >
                      <option>VIP</option><option>R석</option><option>S석</option>
                    </select>
                    <button
                      onClick={() => setZones((prev) => prev.filter((_, j) => j !== i))}
                      className="px-3 h-9 border border-gray-200 rounded text-[13px] hover:bg-gray-50"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setZones((prev) => [...prev, { name: "", rows: "", cols: "", tier: "VIP" }])}
                  className="h-9 border border-dashed border-gray-300 rounded text-[13px] text-[#1a6ad4] hover:bg-blue-50"
                >
                  + 구역 추가 (좌석 자동 생성)
                </button>
              </div>
            </div>

            {/* 버튼 */}
            <div className="col-span-2 flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setTab("list")}
                className="px-5 py-2 border border-gray-300 rounded text-[13.5px] text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button className="px-5 py-2 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0]">
                이벤트 등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}