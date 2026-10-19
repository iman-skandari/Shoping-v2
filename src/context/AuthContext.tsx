"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; phone: string };

type StoredUser = User & { password: string };

type Result = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  isModalOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (phone: string, password: string) => Result;
  signup: (name: string, phone: string, password: string) => Result;
  logout: () => void;
};

const USERS_KEY = "techshop-users";
const SESSION_KEY = "techshop-session";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setHydrated(true);
  }, []);

  const openAuth = useCallback(() => setIsModalOpen(true), []);
  const closeAuth = useCallback(() => setIsModalOpen(false), []);

  const startSession = useCallback((next: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setUser(next);
    setIsModalOpen(false);
  }, []);

  const login = useCallback(
    (phone: string, password: string): Result => {
      const found = readUsers().find((u) => u.phone === phone && u.password === password);
      if (!found) return { ok: false, error: "شماره موبایل یا رمز عبور اشتباه است." };
      startSession({ name: found.name, phone: found.phone });
      return { ok: true };
    },
    [startSession]
  );

  const signup = useCallback(
    (name: string, phone: string, password: string): Result => {
      const users = readUsers();
      if (users.some((u) => u.phone === phone)) {
        return { ok: false, error: "با این شماره قبلاً ثبت‌نام شده است." };
      }
      localStorage.setItem(
        USERS_KEY,
        JSON.stringify([...users, { name: name.trim(), phone, password }])
      );
      startSession({ name: name.trim(), phone });
      return { ok: true };
    },
    [startSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, hydrated, isModalOpen, openAuth, closeAuth, login, signup, logout }),
    [user, hydrated, isModalOpen, openAuth, closeAuth, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}