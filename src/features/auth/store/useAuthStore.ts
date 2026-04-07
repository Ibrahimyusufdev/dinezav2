import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { AuthUser } from "../types/auth.types";

// AuthError
type AuthError = {
  message: string;
  code?: "EMAIL_EXISTS" | "INVALID_CREDENTIALS" | "UNKNOWN";
};
// wiring up AuthState Shape
interface AuthState {
  // State of data
  user: AuthUser | null; // Current logged in user or null
  error: AuthError | null; // error from Api
  isLoading: boolean; // Loading state for Auth check
  isAuthReady: boolean; // For initial auth check on mount

  //Actions
  setUser: (user: AuthUser) => void; // Set the user to database after succesfully entering data to be sent to the database, and mark isAuthenticated
  updateAuthUser: (userData: Partial<Omit<AuthUser, "role">>) => void; // Partially update user data
  setError: (error: AuthError | null) => void; // Set Error
  setLoading: (loading: boolean) => void; // Control loading state, and use in auth initialization and Api calls
  setAuthReady: () => void;
  clearAuth: () => void; // Clears all auth data and reset to initial state
  clearError: () => void;
}

// Auth Store - Global Authentication state using supabase

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    // Setting initial state
    user: null,
    error: null,
    isLoading: false,
    isAuthReady: false,

    // Called after entering data to be sent to the database (After filling diner or restaurant form)
    setUser: (user) => {
      set((state) => {
        state.user = user;
        state.isLoading = false;
        state.error = null;
      });
    },

    // Partially update user data without full re-fetch
    updateAuthUser: (userData: Partial<Omit<AuthUser, "role">>) => {
      set((state) => {
        if (state.user) {
          state.user = { ...state.user, ...userData } as AuthUser;
        }
      });
    },

    setError: (error) => {
      set((state) => {
        state.error = error;
      });
    },

    // Control loading state, and use in auth initialization and Api calls
    setLoading: (loading) => {
      set((state) => {
        state.isLoading = loading;
      });
    },

    // Called once when auth is first resolved, never resets to false
    setAuthReady: () => {
      set((state) => {
        state.isAuthReady = true;
      });
    },
    // Resets everything back to initial state
    clearAuth: () => {
      set((state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      });
    },

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },
  }))
);
