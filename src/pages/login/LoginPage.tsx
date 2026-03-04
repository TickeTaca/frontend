// src/pages/login/LoginPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

type TabType = "login" | "signup";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabType>("login");

  const handleSignup = () => {
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
      <div className="w-full max-w-[1100px]">
        {/* 🔥 카드 높이 고정 */}
        <div className="bg-white rounded-[12px] shadow-md overflow-hidden flex h-[640px]">

          {/* 좌측 패널 */}
          <div className="w-1/2 bg-[#2f6fcd] text-white p-[56px] flex flex-col justify-between">
            <div>
              {/* 🔹 로고 (홈 이동 가능) */}
              <Link
                to="/"
                className="flex items-end gap-2 mb-10 hover:opacity-90 transition"
              >
                <span className="text-[28px] font-extrabold tracking-tight">
                  티키타카
                </span>
                <span className="text-[13px] text-white/70 mb-[3px]">
                  TIKITAKA
                </span>
              </Link>

              <div className="text-[26px] font-bold leading-[1.4] mb-6">
                원하는 자리,<br />
                공정하게 예매하세요.
              </div>

              <div className="text-[14px] text-white/70 leading-[1.8]">
                대기열 순번 보장 · 실시간 좌석 동기화<br />
                수만 명이 동시 접속해도 안정적인 예매
              </div>
            </div>

            <div className="text-[12px] text-white/40">
              © 2025 티키타카. All rights reserved.
            </div>
          </div>


          {/* 우측 패널 */}
          <div className="w-1/2 p-[56px] flex flex-col h-full">

            {/* 탭 */}
            <div className="flex border-b border-gray-300 mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 pb-3 font-bold ${
                  activeTab === "login"
                    ? "text-[#2f6fcd] border-b-2 border-[#2f6fcd]"
                    : "text-gray-400"
                }`}
              >
                로그인
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 pb-3 font-bold ${
                  activeTab === "signup"
                    ? "text-[#2f6fcd] border-b-2 border-[#2f6fcd]"
                    : "text-gray-400"
                }`}
              >
                회원가입
              </button>
            </div>

            {/* 🔹 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col">

              {activeTab === "login" && (
                <>
                  <div>
                    <div className="mb-6">
                      <label className="block text-[13px] text-gray-600 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[13px] text-gray-600 mb-2">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4"
                      />
                    </div>

                    <div className="flex justify-between items-center text-[13px] mb-6">
                      <label className="flex items-center gap-2 text-gray-600">
                        <input type="checkbox" />
                        로그인 상태 유지
                      </label>
                      <button className="text-[#2f6fcd]">
                        비밀번호 찾기
                      </button>
                    </div>

                    <button className="w-full h-[50px] bg-[#2f6fcd] text-white rounded-md font-semibold mb-8">
                      로그인
                    </button>

                    <div className="text-center text-gray-400 text-[13px] mb-6">
                      소셜 계정으로 로그인
                    </div>

                    <div className="space-y-4">
                      <button className="w-full h-[48px] border rounded-md">
                        Google로 로그인
                      </button>
                      <button className="w-full h-[48px] border rounded-md">
                        카카오로 로그인
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "signup" && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-[360px]">
                    <div className="mb-6">
                      <label className="block text-[13px] text-gray-600 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-[13px] text-gray-600 mb-2">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4"
                      />
                    </div>

                    <button
                      onClick={handleSignup}
                      className="w-full h-[50px] bg-[#2f6fcd] text-white rounded-md font-semibold"
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
