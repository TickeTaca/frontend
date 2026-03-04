import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import HomeLayout from "./layouts/HomeLayout";
import BaseLayout from "./layouts/BaseLayout";
import BreadcrumbLayout from "./layouts/BreadcrumbLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import EventDetailPage from "../pages/event/EventDetailPage";
import WaitingPage from "../pages/waiting/WaitingPage";
import SeatSelectPage from "../pages/seat/SeatSelectPage";
import CheckPage from "../pages/payment/CheckPage";
import MyPage from "../pages/mypage/MyPage";
import { useEffect } from "react";
import SuccessPage from "../pages/payment/SuccessPage";
import FailPage from "../pages/payment/FailPage";
import BookingDetailPage from "../pages/mypage/BookingDetailPage";
import AdminDashboardPage from "../pages/admin/pages/AdminDashboard";
import AdminEventsPage from "../pages/admin/pages/AdminEventsPage";
import AdminQueuePage from "../pages/admin/pages/AdminQueuePage";
import AdminPaymentsPage from "../pages/admin/pages/AdminPaymentsPage";
import AdminRefundPage from "../pages/admin/pages/AdminRefundPage";
import AdminStatsPage from "../pages/admin/pages/AdminStatsPage";

function ScrollToTop(){
  const {pathname } = useLocation();
  useEffect(()=>{ window.scrollTo(0,0);}, [pathname]);
  return null;
}
export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* 로그인 (헤더 없음) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 홈 */}
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* 상세/결제/마이 (브레드크럼 포함) */}
        <Route element={<BreadcrumbLayout />}>
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/payment/check" element={<CheckPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/booking/:id" element={<BookingDetailPage />} />
        </Route>

        {/* 헤더만 */}
        <Route element={<BaseLayout />}>
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/seat" element={<SeatSelectPage />} />
          <Route path="/payment/success" element={<SuccessPage />} />
          <Route path="/payment/fail" element={<FailPage />} />
        </Route>

        {/* 관리자 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="queue" element={<AdminQueuePage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="refund" element={<AdminRefundPage />} />
          <Route path="stats" element={<AdminStatsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
