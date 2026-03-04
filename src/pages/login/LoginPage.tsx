// src/pages/login/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

type TabType = "login" | "signup";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();

  const [activeTab, setActiveTab] = useState<TabType>("login");

  // 로그인 폼
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // 회원가입 폼
  const [signupForm, setSignupForm] = useState({ email: "", password: "", name: "" });
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setLoginError("");
    setSignupError("");
    setSignupSuccess("");
  };

  const handleLogin = () => {
    setLoginError("");
    if (!loginForm.email || !loginForm.password) {
      setLoginError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const result = login(loginForm.email, loginForm.password);
    if (!result.ok) {
      setLoginError(result.message);
      return;
    }
    navigate(result.role === "admin" ? "/admin" : "/");
  };

  const handleSignup = () => {
    setSignupError("");
    setSignupSuccess("");
    if (!signupForm.email || !signupForm.password || !signupForm.name) {
      setSignupError("모든 항목을 입력해주세요.");
      return;
    }
    const result = signup(signupForm.email, signupForm.password, signupForm.name);
    if (!result.ok) {
      setSignupError(result.message);
      return;
    }
    setSignupSuccess(result.message);
    setSignupForm({ email: "", password: "", name: "" });
    setTimeout(() => handleTabChange("login"), 1200);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
      <div className="w-full max-w-[1100px]">
        <div className="bg-white rounded-[12px] shadow-md overflow-hidden flex h-[640px]">

          {/* 좌측 패널 */}
          <div className="w-1/2 bg-[#2f6fcd] text-white p-[56px] flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-end gap-2 mb-10 hover:opacity-90 transition">
                <span className="text-[28px] font-extrabold tracking-tight">티키타카</span>
                <span className="text-[13px] text-white/70 mb-[3px]">TIKITAKA</span>
              </Link>
              <div className="text-[26px] font-bold leading-[1.4] mb-6">
                원하는 자리,<br />공정하게 예매하세요.
              </div>
              <div className="text-[14px] text-white/70 leading-[1.8]">
                대기열 순번 보장 · 실시간 좌석 동기화<br />
                수만 명이 동시 접속해도 안정적인 예매
              </div>

              {/* 테스트 계정 안내 */}
              <div className="mt-10 bg-white/10 rounded-lg px-4 py-3 text-[12.5px] text-white/70 leading-[1.9]">
                <p className="text-white/90 font-bold mb-1">🧪 테스트 계정</p>
                <p>일반: user@test.com / 1234</p>
                <p>어드민: admin@test.com / 1234</p>
              </div>
            </div>
            <div className="text-[12px] text-white/40">© 2025 티키타카. All rights reserved.</div>
          </div>

          {/* 우측 패널 */}
          <div className="w-1/2 p-[56px] flex flex-col h-full">

            {/* 탭 */}
            <div className="flex border-b border-gray-300 mb-8">
              {(["login", "signup"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 pb-3 font-bold text-[14px] transition ${
                    activeTab === tab
                      ? "text-[#2f6fcd] border-b-2 border-[#2f6fcd]"
                      : "text-gray-400"
                  }`}
                >
                  {tab === "login" ? "로그인" : "회원가입"}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">

              {/* 로그인 */}
              {activeTab === "login" && (
                <div>
                  <div className="mb-5">
                    <label className="block text-[13px] text-gray-600 mb-2">이메일</label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="name@example.com"
                      className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] outline-none focus:border-[#2f6fcd]"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[13px] text-gray-600 mb-2">비밀번호</label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="비밀번호를 입력하세요"
                      className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] outline-none focus:border-[#2f6fcd]"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[13px] mb-5">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="accent-[#2f6fcd]" />
                      로그인 상태 유지
                    </label>
                    <button className="text-[#2f6fcd]">비밀번호 찾기</button>
                  </div>

                  {/* 에러 메시지 */}
                  {loginError && (
                    <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded text-[13px] text-red-600">
                      {loginError}
                    </div>
                  )}

                  <button
                    onClick={handleLogin}
                    className="w-full h-[50px] bg-[#2f6fcd] hover:bg-[#1a5ab8] text-white rounded-md font-semibold text-[15px] transition mb-6"
                  >
                    로그인
                  </button>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-[12px] text-gray-400">소셜 계정으로 로그인</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="space-y-3">
                    <button className="w-full h-[46px] border border-gray-300 rounded-md text-[13.5px] text-gray-700 hover:bg-gray-50 transition">
                      🔵 Google로 로그인
                    </button>
                    <button className="w-full h-[46px] border border-gray-300 rounded-md text-[13.5px] text-gray-700 hover:bg-gray-50 transition">
                      🟡 카카오로 로그인
                    </button>
                  </div>
                </div>
              )}

              {/* 회원가입 */}
              {activeTab === "signup" && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-[360px]">
                    <div className="mb-5">
                      <label className="block text-[13px] text-gray-600 mb-2">이름</label>
                      <input
                        type="text"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="홍길동"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] outline-none focus:border-[#2f6fcd]"
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-[13px] text-gray-600 mb-2">이메일</label>
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="name@example.com"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] outline-none focus:border-[#2f6fcd]"
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-[13px] text-gray-600 mb-2">비밀번호</label>
                      <input
                        type="password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm((p) => ({ ...p, password: e.target.value }))}
                        placeholder="4자 이상"
                        className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] outline-none focus:border-[#2f6fcd]"
                      />
                    </div>

                    {/* 에러 / 성공 메시지 */}
                    {signupError && (
                      <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded text-[13px] text-red-600">
                        {signupError}
                      </div>
                    )}
                    {signupSuccess && (
                      <div className="mb-4 px-3 py-2.5 bg-green-50 border border-green-200 rounded text-[13px] text-green-700">
                        ✅ {signupSuccess}
                      </div>
                    )}

                    <button
                      onClick={handleSignup}
                      className="w-full h-[50px] bg-[#2f6fcd] hover:bg-[#1a5ab8] text-white rounded-md font-semibold text-[15px] transition"
                    >
                      회원가입
                    </button>

                    <p className="text-center text-[13px] text-gray-400 mt-5">
                      이미 계정이 있으신가요?{" "}
                      <button
                        onClick={() => handleTabChange("login")}
                        className="text-[#2f6fcd] font-medium"
                      >
                        로그인 →
                      </button>
                    </p>
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