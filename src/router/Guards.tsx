// src/router/guards.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

// 로그인 필요 라우트 — 미로그인 시 /login 리다이렉트
export function AuthGuard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

// 어드민 전용 라우트 — 비어드민 시 / 리다이렉트
export function AdminGuard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/" replace />;
  if (currentUser.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}

// 로그인 상태에서 /login 접근 시 홈으로
export function GuestGuard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
}