// src/store/waiting.store.ts
import { create } from "zustand";

interface WaitingState {
  isInQueue: boolean;
  eventId: string | null;
  enterQueue: (eventId: string) => void;
  leaveQueue: () => void;
}

export const useWaitingStore = create<WaitingState>()((set) => ({
  isInQueue: false,
  eventId: null,
  enterQueue: (eventId) => set({ isInQueue: true, eventId }),
  leaveQueue: () => set({ isInQueue: false, eventId: null }),
}));