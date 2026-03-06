import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import HomeLayout from "./layouts/HomeLayout";
import BaseLayout from "./layouts/BaseLayout";
import BreadcrumbLayout from "./layouts/BreadcrumbLayout";
import AdminLayout from "./layouts/AdminLayout";
import { AuthGuard, AdminGuard } from "./Guards";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import EventDetailPage from "../pages/event/EventDetailPage";
import WaitingPage from "../pages/waiting/WaitingPage";
import SeatSelectPage from "../pages/seat/SeatSelectPage";
import CheckPage from "../pages/payment/CheckPage";
import SuccessPage from "../pages/payment/SuccessPage";
import FailPage from "../pages/payment/FailPage";
import MyPage from "../pages/mypage/MyPage";
import BookingDetailPage from "../pages/mypage/BookingDetailPage";
import AdminDashboardPage from "../pages/admin/pages/AdminDashboard";
import AdminEventsPage from "../pages/admin/pages/AdminEventsPage";
import AdminQueuePage from "../pages/admin/pages/AdminQueuePage";
import AdminPaymentsPage from "../pages/admin/pages/AdminPaymentsPage";
import AdminRefundPage from "../pages/admin/pages/AdminRefundPage";
import AdminStatsPage from "../pages/admin/pages/AdminStatsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 홈 — 누구나 */}
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* 이벤트 상세 — 누구나 */}
        <Route element={<BreadcrumbLayout />}>
          <Route path="/event/:eventId" element={<EventDetailPage />} />
        </Route>

        {/* 결제/마이 — 로그인 필요 */}
        <Route element={<AuthGuard />}>
          <Route element={<BreadcrumbLayout />}>
            <Route path="/payment/check" element={<CheckPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/booking/:id" element={<BookingDetailPage />} />
          </Route>
          <Route element={<BaseLayout />}>
            <Route path="/waiting" element={<WaitingPage />} />
            <Route path="/seat" element={<SeatSelectPage />} />
            <Route path="/payment/success" element={<SuccessPage />} />
            <Route path="/payment/fail" element={<FailPage />} />
          </Route>
        </Route>

        {/* 어드민 — admin role 필요 */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="events"    element={<AdminEventsPage />} />
            <Route path="queue"     element={<AdminQueuePage />} />
            <Route path="payments"  element={<AdminPaymentsPage />} />
            <Route path="refund"    element={<AdminRefundPage />} />
            <Route path="stats"     element={<AdminStatsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}