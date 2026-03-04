// src/pages/admin/pages/AdminRefundPage.tsx
import { useState } from "react";

type Tab = "pending" | "done" | "policy";

const REQUESTS = [
  {
    no: "TCT-2025-08164889",
    requestedAt: "2025.07.04 10:31",
    event: "두산 vs LG 한국시리즈 3차전",
    user: "lee***@daum.net",
    seat: "1루 외야 12번",
    amount: "15,300원",
    reason: "일정 변경",
    note: "공연일 D-5 → 환불 수수료 10% / 환불액: 13,770원 / 승인 시 좌석 AVAILABLE 복구 + WebSocket 브로드캐스트",
  },
];

const POLICY = [
  { period: "공연일 7일 초과", fee: "수수료 없음", feeCls: "text-green-600"  },
  { period: "공연일 D-7",      fee: "10% 수수료",  feeCls: "text-yellow-700" },
  { period: "공연일 D-3",      fee: "20% 수수료",  feeCls: "text-[#f05a00]"  },
  { period: "공연일 D-1 이후", fee: "취소 불가",   feeCls: "text-red-600"    },
];

export default function AdminRefundPage() {
  const [tab, setTab] = useState<Tab>("pending");

  return (
    <div className="p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-[20px] font-bold">취소 / 환불 관리</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">
          취소 요청 검토 · 환불 처리 · 좌석 AVAILABLE 복구 → WebSocket 브로드캐스트
        </p>
      </div>

      <div className="flex border-b border-gray-200">
        {([
          ["pending", "취소 요청 대기 (3)"],
          ["done",    "처리 완료"         ],
          ["policy",  "취소 정책 설정"    ],
        ] as [Tab, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 text-[13.5px] font-medium border-b-2 transition ${
              tab === key ? "border-[#1a6ad4] text-[#1a6ad4]" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <div className="flex flex-col gap-3">
          {REQUESTS.map((req) => (
            <div key={req.no} className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[12px] text-gray-400">{req.no}</span>
                  <span className="text-[11.5px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">취소요청</span>
                </div>
                <span className="text-[12px] text-gray-400">요청일: {req.requestedAt}</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {([
                  ["이벤트",      req.event ],
                  ["예매자",      req.user  ],
                  ["좌석 / 금액", `${req.seat} · ${req.amount}`],
                  ["취소 사유",   req.reason],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[12px] text-gray-400 mb-0.5">{label}</p>
                    <p className="text-[13.5px] font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <div className="flex-1 bg-orange-50 border border-yellow-200 rounded px-3 py-2 text-[12.5px] text-yellow-800 leading-[1.6]">
                  {req.note}
                </div>
                <button
                  onClick={() => window.confirm("반려 처리하시겠습니까?")}
                  className="px-4 py-2 border border-gray-300 rounded text-[13px] text-gray-600 hover:bg-gray-50 shrink-0"
                >
                  반려
                </button>
                <button
                  onClick={() => window.confirm("환불을 승인하시겠습니까?\n승인 시 좌석이 AVAILABLE 상태로 복구됩니다.")}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-bold text-[13px] shrink-0"
                >
                  환불 승인
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "done" && (
        <div className="bg-white border border-gray-200 rounded-md py-16 flex flex-col items-center gap-2 text-gray-400">
          <p className="text-[15px]">✅</p>
          <p className="text-[13.5px]">처리 완료 내역이 없습니다.</p>
        </div>
      )}

      {tab === "policy" && (
        <div className="bg-white border border-gray-200 rounded-md p-5">
          <p className="text-[14px] font-bold mb-4">취소 정책 설정</p>
          <div className="flex flex-col gap-2 mb-5">
            {POLICY.map(({ period, fee, feeCls }) => (
              <div key={period} className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-md hover:bg-gray-50">
                <span className="text-[13.5px] font-medium">{period}</span>
                <span className={`text-[13px] font-medium ${feeCls}`}>{fee}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="px-5 py-2 bg-[#1a6ad4] hover:bg-[#1458b0] text-white rounded font-bold text-[13.5px]">
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}