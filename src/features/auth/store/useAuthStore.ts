import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types/auth.types";

// wiring up AuthState Shape
interface AuthState {
  // State of data
  user: AuthUser | null; // Current logged in user or null
  accessToken: string | null; // short-lived token used to authenticate user
  error: string | null; // error from Api
  isAuthenticated: boolean; // Quick boolean check control to tell that a user is authenticated or not
  isLoading: boolean; // Loading state for Auth check
  // isCheckingAuth: boolean; // Boolean check if user is authenticated or not, use it to check on app//component mounted

  //Actions

  setAuth: (user: AuthUser, accessToken: string) => void; // Set Auth - called after successful login/register, and also set User and token, and mark as authenticated
  setAccessToken: (token: string | null) => void; // Set access token in memory
  setError: (error: string | null) => void; // Set Error
  setLoading: (loading: boolean) => void; // Control loading state, and use in auth initialization and Api calls
  updateAuthUser: (userData: Partial<AuthUser>) => void; // Partially update user data

  // checkAuth: () => void;   // Check Auth

  clearAuth: () => void; // Clears all auth data and reset to initial state
}

/**
Auth Store - Global Authentication state, persisted to localstorage, so users stay logged in
 */

export const useAuthStore = create<AuthState>()(
  immer(
    persist(
      (set) => ({
        // Setting initial state
        user: null,
        accessToken: null,
        error: null,
        isAuthenticated: false,
        isLoading: false,

        // Called after successful login or register
        setAuth: (user, accessToken) => {
          set((state) => {
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
          });
        },

        // Used by refresh token flow to update token in memory
        setAccessToken: (token) => {
          set((state) => {
            state.accessToken = token;
            state.isAuthenticated = !!token;
          });
        },

        setError: (error) => {
          set((state) => {
            state.error = error;
            state.isLoading = false;
          });
        },

        // Control loading state, and use in auth initialization and Api calls
        setLoading: (loading) => {
          set((state) => {
            state.isLoading = loading;
          });
        },

        // Partially update user data without full re-fetch
        updateAuthUser: (userData) => {
          set((state) => {
            if (state.user) {
              state.user = { ...state.user, ...userData };
            }
          });
        },

        // Resets everything back to initial state
        clearAuth: () => {
          set((state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
          });
        },
      }),
      {
        name: "dineza-auth",
        partialize: (state) => ({
          user: state.user, // only persist user — token lives in memory only
        }),
      }
    )
  )
);
