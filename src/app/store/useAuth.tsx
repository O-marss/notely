'use client'
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {AuthStore } from "../interfaces";

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      isAuthenticated: false,
      setToken: (token: string) => set({ token, isAuthenticated: !!token }),
      clearToken: () => set({ token: "", isAuthenticated: false }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);