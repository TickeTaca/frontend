// src/pages/admin/pages/AdminQueuePage.tsx
import { useState } from "react";

const QUEUE_ROWS = [
  { seq: "1",     user: "hong***@gmail.com", startAt: "10:00:03", eta: "입장 완료", status: "입장",  statusCls: "bg-blue-100 text-[#1a6ad4]", canKick: false },
  { seq: "3,244", user: "lee***@daum.net",   startAt: "10:01:22", eta: "10:15:10", status: "대기중", statusCls: "bg-gray-100 text-gray-500",  canKick: true  },
  { seq: "3,245", user: "park***@kakao.com", startAt: "10:01:23", eta: "10:15:11", status: "대기중", statusCls: "bg-gray-100 text-gray-500",  canKick: true  },
];

export default function AdminQueuePage() {
  const [batch,  setBatch]  = useState(50);
  const [intv,   setIntv]   = useState(3);
  const [paused, setPaused] = useState(false);

  const handleApply = () => {
    if (window.confirm(`입장 속도를 ${batch}명 / ${intv}초로 변경하시겠습니까?`)) {
      alert("적용되었습니다.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-[20px] font-bold">대기열 관리</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">이벤트별 입장 속도 · 주기 조절 및 일시정지</p>
      </div>

      {/* 이벤트 선택 */}
      <div className="bg-white border border-gray-200 rounded-md p-4">
        <select className="w-full h-9 px-3 border border-gray-200 rounded text-[13px] outline-none">
          <option>아이유 THE GOLDEN HOUR WORLD TOUR (예매중)</option>
          <option>두산 vs LG 3차전</option>
        </select>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "총 대기 인원", value: "12,847",            delta: "▲ +240/분",      border: "border-t-[#1a6ad4]"  },
          { label: "입장 속도",    value: `${batch}/${intv}초`, delta: "기본값",          border: "border-t-[#f05a00]"  },
          { label: "입장 완료",    value: "3,440",             delta: "오픈 후 15분",    border: "border-t-green-500"  },
          { label: "대기열 상태",  value: paused ? "일시정지" : "정상 운행",
            delta: paused ? "입장 중단" : "일시정지 없음",
            border: paused ? "border-t-red-500" : "border-t-[#1a6ad4]" },
        ].map(({ label, value, delta, border }) => (
          <div key={label} className={`bg-white border border-gray-200 border-t-[3px] ${border} rounded-md p-4`}>
            <p className="text-[11.5px] text-gray-400 mb-1">{label}</p>
            <p className="text-[22px] font-bold">{value}</p>
            <p className="text-[11px] text-gray-400 mt-1">{delta}</p>
          </div>
        ))}
      </div>

      {/* 속도 조절 */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold flex items-center gap-3">
          입장 속도 조절
          <span className="text-[11px] text-[#f05a00] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">⚠ 적용 버튼 클릭 후 확인창 반영</span>
        </div>
        <div className="p-5">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 text-[12.5px] text-yellow-800 leading-[1.7]">
            <strong>설정 범위:</strong> 입장 인원 10~200명 / 입장 주기 1~10초<br />
            현재 서버 TPS: <strong>2,340</strong> · 권장 최대 입장 속도: <strong>200명 / 3초</strong>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[12.5px] text-gray-500 mb-2">한 번에 입장시킬 인원 수</label>
              <div className="flex items-center gap-3">
                <input type="range" min={10} max={200} value={batch} onChange={(e) => setBatch(+e.target.value)} className="flex-1 accent-[#1a6ad4]" />
                <span className="text-[18px] font-bold text-[#1a6ad4] w-[50px]">{batch}</span>
                <span className="text-[13px] text-gray-500">명</span>
              </div>
            </div>
            <div>
              <label className="block text-[12.5px] text-gray-500 mb-2">입장 처리 주기</label>
              <div className="flex items-center gap-3">
                <input type="range" min={1} max={10} value={intv} onChange={(e) => setIntv(+e.target.value)} className="flex-1 accent-[#1a6ad4]" />
                <span className="text-[18px] font-bold text-[#1a6ad4] w-[35px]">{intv}</span>
                <span className="text-[13px] text-gray-500">초</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setBatch(50); setIntv(3); }} className="flex-1 py-2.5 border border-gray-300 rounded text-[13px] text-gray-600 hover:bg-gray-50">초기화 (50명 / 3초)</button>
            <button onClick={handleApply} className="flex-[2] py-2.5 bg-[#f05a00] text-white rounded font-bold text-[14px] hover:bg-orange-600">변경 적용 (확인 팝업 후 반영)</button>
          </div>
        </div>
      </div>

      {/* 일시정지 */}
      <div className="bg-white border-2 border-red-400 rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-red-200 bg-red-50 text-[13.5px] font-bold flex items-center gap-3">
          🚨 대기열 일시 정지
          <span className="text-[11px] text-red-600 border border-red-200 px-2 py-0.5 rounded">서버 장애 시 사용</span>
        </div>
        <div className="p-5">
          <p className="text-[13px] text-gray-700 leading-[1.7] mb-4">
            입장을 <strong>즉시 멈추고</strong> 대기열 순번만 유지합니다.<br />
            <span className="text-[12px] text-gray-400">복구 후 재시작 시 이어서 입장 처리됩니다.</span>
          </p>
          <div className="flex gap-2">
            <button onClick={() => { if (window.confirm("대기열 입장을 일시 정지하시겠습니까?")) setPaused(true); }}
              disabled={paused}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded font-bold text-[14px]">⏸ 입장 일시 정지</button>
            <button onClick={() => setPaused(false)}
              disabled={!paused}
              className="flex-1 py-2.5 border border-gray-300 rounded text-[13px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">▶ 입장 재개</button>
          </div>
        </div>
      </div>

      {/* 대기열 테이블 */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold flex items-center gap-2">
          대기열 실시간 현황
          <span className="text-[11px] text-white bg-red-500 px-2 py-0.5 rounded animate-pulse">LIVE</span>
        </div>
        <table className="w-full text-[12.5px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>{["순번","사용자","대기 시작","예상 입장","상태","조치"].map((h) => (
              <th key={h} className="px-4 py-2.5 text-left font-medium text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {QUEUE_ROWS.map((row) => (
              <tr key={row.seq} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2.5 font-mono">{row.seq}</td>
                <td className="px-4 py-2.5">{row.user}</td>
                <td className="px-4 py-2.5">{row.startAt}</td>
                <td className="px-4 py-2.5">{row.eta}</td>
                <td className="px-4 py-2.5"><span className={`text-[11.5px] px-2 py-0.5 rounded font-medium ${row.statusCls}`}>{row.status}</span></td>
                <td className="px-4 py-2.5">
                  {row.canKick
                    ? <button onClick={() => window.confirm(`${row.user}을 강제퇴장 하시겠습니까?`)} className="px-2.5 py-1 border border-gray-200 rounded text-[11px] hover:bg-red-50 hover:border-red-300 hover:text-red-600">강제퇴장</button>
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}