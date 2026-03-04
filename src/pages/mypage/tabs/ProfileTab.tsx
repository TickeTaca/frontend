// src/pages/mypage/tabs/ProfileTab.tsx
import { useState } from "react";

export default function ProfileTab() {
  const [name,  setName]  = useState("홍길동");
  const [email, setEmail] = useState("hong@example.com");
  const [phone, setPhone] = useState("010-1234-5678");

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[16px] font-bold mb-4">
        <span className="block w-[3px] h-[16px] bg-[#1a6ad4] rounded" />
        회원 정보 수정
      </h2>

      <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col gap-4">
        {[
          { label: "이름",     value: name,  onChange: setName,  type: "text",  disabled: false },
          { label: "이메일",   value: email, onChange: setEmail, type: "email", disabled: true  },
          { label: "휴대폰번호", value: phone, onChange: setPhone, type: "tel",   disabled: false },
        ].map(({ label, value, onChange, type, disabled }) => (
          <div key={label}>
            <label className="block text-[12.5px] text-gray-500 mb-1.5">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className={`w-full h-[40px] px-3 border border-gray-200 rounded text-[13.5px] outline-none ${
                disabled
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "focus:border-[#1a6ad4]"
              }`}
            />
            {disabled && (
              <p className="text-[11.5px] text-gray-400 mt-1">이메일은 변경할 수 없습니다.</p>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <button className="px-5 py-2 bg-[#1a6ad4] text-white rounded font-bold text-[13.5px] hover:bg-[#1458b0]">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}