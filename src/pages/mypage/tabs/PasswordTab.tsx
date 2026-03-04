// src/pages/mypage/tabs/PasswordTab.tsx
import { useState } from "react";

export default function PasswordTab() {
  const [current, setCurrent]   = useState("");
  const [next,    setNext]      = useState("");
  const [confirm, setConfirm]   = useState("");

  const mismatch = next && confirm && next !== confirm;
  const canSave  = current && next && confirm && !mismatch;

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[16px] font-bold mb-4">
        <span className="block w-[3px] h-[16px] bg-[#1a6ad4] rounded" />
        비밀번호 변경
      </h2>

      <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col gap-4">
        {[
          { label: "현재 비밀번호",   value: current, onChange: setCurrent, hint: "" },
          { label: "새 비밀번호",     value: next,    onChange: setNext,    hint: "영문, 숫자, 특수문자 포함 8자 이상" },
          { label: "새 비밀번호 확인", value: confirm, onChange: setConfirm, hint: "" },
        ].map(({ label, value, onChange, hint }) => (
          <div key={label}>
            <label className="block text-[12.5px] text-gray-500 mb-1.5">{label}</label>
            <input
              type="password"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full h-[40px] px-3 border rounded text-[13.5px] outline-none transition ${
                label === "새 비밀번호 확인" && mismatch
                  ? "border-red-400 focus:border-red-400"
                  : "border-gray-200 focus:border-[#1a6ad4]"
              }`}
            />
            {hint && <p className="text-[11.5px] text-gray-400 mt-1">{hint}</p>}
            {label === "새 비밀번호 확인" && mismatch && (
              <p className="text-[11.5px] text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <button
            disabled={!canSave}
            className="px-5 py-2 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}