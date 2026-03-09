// src/store/booking.store.ts
import { create } from "zustand";

interface BookingState {
  seatLocked: boolean;   // 좌석 점유 성공 시 true → CheckPage 진입 허용
  paymentDone: boolean;  // 결제 완료 시 true → Success/Fail 진입 허용

  lockSeats: () => void;
  completePayment: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()((set) => ({
  seatLocked: false,
  paymentDone: false,

  lockSeats: () => set({ seatLocked: true }),
  completePayment: () => set({ seatLocked: false, paymentDone: true }),
  resetBooking: () => set({ seatLocked: false, paymentDone: false }),
}));