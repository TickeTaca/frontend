// src/pages/admin/pages/AdminPaymentsPage.tsx
import { useState } from "react";

interface Payment {
  no: string;
  event: string;
  seat: string;
  user: string;
  method: string;
  amount: string;
  status: "완료" | "취소" | "실패";
  time: string;
}

const PAYMENTS: Payment[] = [
  { no: "TCT-2025-08164891", event: "아이유 WORLD TOUR",  seat: "A열 8·9번",    user: "hong***", method: "카드",      amount: "269,280원", status: "완료", time: "10:31:52" },
  { no: "TCT-2025-08164889", event: "두산 vs LG",         seat: "1루 외야 12번", user: "lee***",  method: "카드",      amount: "15,300원",  status: "취소", time: "10:31:33" },
  { no: "TCT-2025-08164888", event: "아이유 WORLD TOUR",  seat: "C열 22번",     user: "park***", method: "네이버페이", amount: "99,000원",  status: "실패", time: "10:31:20" },
];

const STATUS_CLS: Record<Payment["status"], string> = {
  완료: "bg-blue-100 text-[#1a6ad4]",
  취소: "bg-gray-100 text-gray-500",
  실패: "bg-orange-100 text-[#f05a00]",
};

const KPIS = [
  { label: "총 결제 건수",         value: "8,921",  sub: undefined,      top: "border-t-[#1a6ad4]" },
  { label: "총 결제액",             value: "24.0억", sub: undefined,      top: "border-t-green-500" },
  { label: "결제 실패 (모의 10%)", value: "43",     sub: "실패율 0.48%", top: "border-t-[#f05a00]" },
  { label: "환불 완료",             value: "12",     sub: "3,240,000원",  top: "border-t-red-500"   },
] as const;

export default function AdminPaymentsPage() {
  const [page, setPage] = useState(1);

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* 헤더 */}
      <div>
        <h1 className="text-[20px] font-bold">결제 내역</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">1분 단위 갱신 · 페이지 단위 표시</p>
      </div>

      {/* 검색/필터 */}
      <div className="bg-white border border-gray-200 rounded-md p-4 flex gap-2 flex-wrap">
        <input
          placeholder="예매번호 / 사용자 검색"
          className="flex-1 h-9 px-3 border border-gray-200 rounded text-[13px] outline-none focus:border-[#1a6ad4] min-w-[160px]"
        />
        <select className="w-[150px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none">
          <option>전체 이벤트</option>
          <option>아이유 WORLD TOUR</option>
          <option>두산 vs LG</option>
        </select>
        <select className="w-[110px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none">
          <option>전체 상태</option>
          <option>완료</option>
          <option>취소</option>
          <option>실패</option>
        </select>
        <input type="date" defaultValue="2025-07-04" className="w-[130px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none" />
        <span className="text-gray-400 leading-9">~</span>
        <input type="date" defaultValue="2025-07-04" className="w-[130px] h-9 px-2 border border-gray-200 rounded text-[13px] outline-none" />
        <button className="px-4 h-9 bg-[#1a6ad4] text-white rounded text-[13px] shrink-0 hover:bg-[#1458b0]">
          검색
        </button>
      </div>

      {/* KPI 4개 */}
      <div className="grid grid-cols-4 gap-3">
        {KPIS.map(({ label, value, sub, top }) => (
          <div key={label} className={`bg-white border border-gray-200 border-t-[3px] ${top} rounded-md p-4`}>
            <p className="text-[11.5px] text-gray-400 mb-1">{label}</p>
            <p className="text-[24px] font-bold">{value}</p>
            {sub && <p className="text-[11px] text-gray-400 mt-1">{sub}</p>}
          </div>
        ))}
      </div>

      {/* 테이블 */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">
          결제 목록{" "}
          <span className="text-[11.5px] font-normal text-gray-400">(1분 단위 갱신)</span>
        </div>
        <table className="w-full text-[12.5px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["예매번호", "이벤트", "좌석", "예매자", "결제수단", "금액", "상태", "결제시각"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((p) => (
              <tr key={p.no} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2.5 font-mono text-[12px]">{p.no}</td>
                <td className="px-4 py-2.5">{p.event}</td>
                <td className="px-4 py-2.5">{p.seat}</td>
                <td className="px-4 py-2.5">{p.user}</td>
                <td className="px-4 py-2.5">{p.method}</td>
                <td className="px-4 py-2.5 font-medium">{p.amount}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-[11.5px] px-2 py-0.5 rounded font-medium ${STATUS_CLS[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[12px] text-gray-400">{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="px-4 py-3 flex justify-center gap-1">
          {["이전", "1", "2", "다음"].map((label) => (
            <button
              key={label}
              onClick={() => { if (/^\d+$/.test(label)) setPage(Number(label)); }}
              className={`px-3 py-1.5 border rounded text-[12px] ${
                label === String(page)
                  ? "border-[#1a6ad4] bg-[#1a6ad4] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}