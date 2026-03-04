// src/pages/admin/pages/AdminStatsPage.tsx
const HOURLY=[2,3,4,8,12,10,18,14,16,20,24,22,18,14,16,20,18,22,16,12,8,6,4,2];
const MAX_H=Math.max(...HOURLY);
const PAY=[{label:"신용/체크카드",pct:54.2,cls:"bg-[#1a6ad4]"},{label:"카카오페이",pct:24.1,cls:"bg-yellow-400"},{label:"네이버페이",pct:12.8,cls:"bg-green-500"},{label:"페이코 / 기타",pct:8.9,cls:"bg-[#f05a00]"}];
const EVT=[{name:"아이유 THE GOLDEN HOUR WORLD TOUR",count:"8,921",sold:17.8,revenue:"2,403,512,800원",cancel:"0.13%",fail:"10.2% (모의)"},{name:"레미제라블 내한공연 2025",count:"734",sold:61.2,revenue:"51,380,000원",cancel:"0.4%",fail:"9.8% (모의)"}];
const KPIS=[{label:"총 예매 건수",value:"8,921",delta:"▲ +2,340 (전일)",top:"border-t-[#1a6ad4]"},{label:"총 매출",value:"24.0억",delta:"▲ +18.3%",top:"border-t-green-500"},{label:"신규 가입자",value:"1,284",delta:"▲ +340 (오늘)",top:"border-t-[#f05a00]"},{label:"평균 결제액",value:"269K",delta:"원/건",top:"border-t-[#1a6ad4]"}];

export default function AdminStatsPage() {
  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold">통계 분석</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">매출, 예매, 사용자 통계</p>
        </div>
        <div className="flex gap-2">
          <select className="h-9 w-[120px] px-2 border border-gray-200 rounded text-[13px] outline-none">
            <option>오늘</option><option>이번 주</option><option>이번 달</option>
          </select>
          <button className="h-9 px-4 border border-gray-300 rounded text-[13px] text-gray-600 hover:bg-gray-50">
            📥 리포트 다운로드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {KPIS.map(({label,value,delta,top})=>(
          <div key={label} className={`bg-white border border-gray-200 border-t-[3px] ${top} rounded-md p-4`}>
            <p className="text-[11.5px] text-gray-400 mb-1">{label}</p>
            <p className="text-[24px] font-bold">{value}</p>
            <p className="text-[11px] text-green-600 mt-1">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">시간대별 예매 현황</div>
          <div className="p-4">
            <div className="flex items-end gap-0.5 h-[100px]">
              {HOURLY.map((v,i)=>(
                <div key={i} className="flex-1 rounded-t bg-[#1a6ad4] opacity-80"
                  style={{height:`${(v/MAX_H)*100}%`}}/>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10.5px] text-gray-400">
              <span>00시</span><span>06시</span><span>10시</span><span>18시</span><span>24시</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">결제 수단 분포</div>
          <div className="p-4 flex flex-col gap-3">
            {PAY.map(({label,pct,cls})=>(
              <div key={label}>
                <div className="flex justify-between text-[12.5px] mb-1.5">
                  <span>{label}</span><span className="font-bold">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className={`h-full rounded-full ${cls}`} style={{width:`${pct}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-[13.5px] font-bold">이벤트별 매출 현황</div>
        <table className="w-full text-[12.5px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["이벤트명","예매 건수","판매율","매출","취소율","모의결제 실패율"].map(h=>(
                <th key={h} className="px-4 py-2.5 text-left font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVT.map(ev=>(
              <tr key={ev.name} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium">{ev.name}</td>
                <td className="px-4 py-3">{ev.count}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-100 rounded-full w-20">
                      <div className={`h-full rounded-full ${ev.sold>50?"bg-[#f05a00]":"bg-[#1a6ad4]"}`}
                        style={{width:`${ev.sold}%`}}/>
                    </div>
                    <span className="text-[12px] whitespace-nowrap">{ev.sold}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">{ev.revenue}</td>
                <td className="px-4 py-3 text-green-600">{ev.cancel}</td>
                <td className="px-4 py-3 text-[#f05a00]">{ev.fail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}