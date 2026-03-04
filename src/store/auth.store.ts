// src/store/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

interface AuthState {
  // 현재 로그인 유저
  currentUser: Omit<User, "password"> | null;

  // 가입된 유저 목록 (더미 DB 역할)
  users: User[];

  // 액션
  login: (email: string, password: string) => { ok: boolean; message: string; role?: UserRole };
  signup: (email: string, password: string, name: string) => { ok: boolean; message: string };
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
}

// 초기 더미 유저
const INITIAL_USERS: User[] = [
  {
    id: "u-001",
    email: "user@test.com",
    password: "1234",
    name: "홍길동",
    role: "user",
    createdAt: "2025-01-01",
  },
  {
    id: "u-002",
    email: "admin@test.com",
    password: "1234",
    name: "관리자",
    role: "admin",
    createdAt: "2025-01-01",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: INITIAL_USERS,

      login: (email, password) => {
        const users = get().users;
        const found = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!found) {
          return { ok: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
        }

        const { password: _, ...userWithoutPw } = found;
        set({ currentUser: userWithoutPw });
        return { ok: true, message: "로그인 성공", role: found.role };
      },

      signup: (email, password, name) => {
        const users = get().users;

        if (users.some((u) => u.email === email)) {
          return { ok: false, message: "이미 사용 중인 이메일입니다." };
        }
        if (password.length < 4) {
          return { ok: false, message: "비밀번호는 4자 이상이어야 합니다." };
        }
        if (name.trim().length < 2) {
          return { ok: false, message: "이름은 2자 이상이어야 합니다." };
        }

        const newUser: User = {
          id: `u-${Date.now()}`,
          email,
          password,
          name: name.trim(),
          role: "user",
          createdAt: new Date().toISOString().slice(0, 10),
        };

        set({ users: [...users, newUser] });
        return { ok: true, message: "회원가입이 완료되었습니다. 로그인해주세요." };
      },

      logout: () => {
        set({ currentUser: null });
      },

      isLoggedIn: () => {
        return get().currentUser !== null;
      },

      isAdmin: () => {
        return get().currentUser?.role === "admin";
      },
    }),
    {
      name: "tikitaka-auth",         // localStorage key
      partialize: (state) => ({      // password는 저장 제외
        currentUser: state.currentUser,
        users: state.users,
      }),
    }
  )
);