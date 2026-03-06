// src/router/guards.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useWaitingStore } from "../store/waiting.store";

// 로그인 필요 라우트 — 미로그인 시 /login 리다이렉트
export function AuthGuard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const { isInQueue, eventId: queueEventId } = useWaitingStore();
  const location = useLocation();

  if (!currentUser) {
    if (isInQueue && queueEventId) {
      return <Navigate to={`/login?redirect=/waiting&eventId=${queueEventId}`} replace />;
    }
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return <Outlet />;
}

// 어드민 전용 라우트 — 비어드민 시 / 리다이렉트
export function AdminGuard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/" replace />;
  if (currentUser.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}