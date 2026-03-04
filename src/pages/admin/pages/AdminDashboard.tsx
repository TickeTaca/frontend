// src/pages/admin/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BAR_DATA = [30, 46, 63, 80, 57, 91, 74, 100, 85, 70, 96, 88];
const MAX_BAR  = Math.max(...BAR_DATA);

const LIVE_EVENTS = [
  { name: "아이유 WORLD TOUR", badge: "● LIVE",  badgeCls: "bg-blue-100 text-[#1a6ad4]",    sold: "17.8%", queue: "12,847" },
  { name: "두산 vs LG 3차전",  badge: "마감임박", badgeCls: "bg-orange-100 text-[#f05a00]", sold: "92.4%", queue: "4,210"  },
  { name: "레미제라블",         badge: "● LIVE",  badgeCls: "bg-blue-100 text-[#1a6ad4]",    sold: "61.2%", queue: "830"    },
];

function KpiCard({ label, value, delta, up = false, topColor }: {
  label: string; value: string; delta: string; up?: boolean; topColor: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 border-t-[3px] ${topColor} rounded-md p-4`}>
      <p className="text-[11.5px] text-gray-400 mb-1">{label}</p>
      <p className="text-[24px] font-bold leading-tight">{value}</p>
      <p className={`text-[11px] mt-1 ${up ? "text-green-600" : "text-gray-400"}`}>{delta}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const visitors = (18340 + (tick % 5) * 23).toLocaleString();
  const queue    = Math.max(0, 12847 - tick * 7).toLocaleString();

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* 헤더 */}
      <div>
        <h1 className="text-[20px] font-bold">실시간 대시보드</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">
          자동 갱신 · 실시간 접속자/대기열: WebSocket 기준 · 판매율/분당 예매: 5초 · 응답시간: 10초
        </p>
      </div>

      {/* KPI 5개 */}
      <div className="grid grid-cols-5 gap-3">
        <KpiCard label="실시간 접속자" value={visitors} delta="▲ WebSocket 연결" up    topColor="border-t-[#1a6ad4]" />
        <KpiCard label="현재 대기열"   value={queue}    delta="▲ +240/분"        up    topColor="border-t-[#f05a00]" />
        <KpiCard label="좌석 판매율"   value="17.8%"   delta="▲ 5초 갱신"       up    topColor="border-t-green-500" />
        <KpiCard label="분당 예매 수"  value="220"     delta="최근 1분 기준"           topColor="border-t-[#1a6ad4]" />
        <KpiCard label="p99 응답시간"  value="212ms"   delta="p50: 42ms · p95: 128ms" topColor="border-t-red-500"   />
      </div>

      {/* 패널 2열 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 바 차트 */}
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold flex items-center justify-between">
            분당 예매 처리량 (최근 12분)
            <span className="text-[11px] text-white bg-red-500 px-2 py-0.5 rounded animate-pulse">LIVE</span>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-1 h-[90px]">
              {BAR_DATA.map((val, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${val >= MAX_BAR * 0.9 ? "bg-[#f05a00]" : "bg-[#1a6ad4]"}`}
                  style={{ height: `${(val / MAX_BAR) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10.5px] text-gray-400">
              <span>12분 전</span><span>6분 전</span><span>현재</span>
            </div>
          </div>
        </div>

        {/* 진행 중인 이벤트 */}
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">
            진행 중인 이벤트
          </div>
          <table className="w-full text-[12.5px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["이벤트명", "상태", "판매율", "대기"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LIVE_EVENTS.map((ev) => (
                <tr key={ev.name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{ev.name}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[11.5px] px-2 py-0.5 rounded font-medium ${ev.badgeCls}`}>
                      {ev.badge}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">{ev.sold}</td>
                  <td className="px-4 py-2.5 font-mono">{ev.queue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 안내 배너 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-md px-4 py-3 text-[13px] text-yellow-800">
        💡 <strong>대기열 입장 속도 조절 · 일시정지</strong>는{" "}
        <button
          onClick={() => navigate("/admin/queue")}
          className="text-[#1a6ad4] underline hover:opacity-80"
        >
          대기열 관리
        </button>
        에서 단계적으로 진행합니다.
      </div>
    </div>
  );
}