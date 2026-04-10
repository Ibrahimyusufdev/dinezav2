import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// AuthError
type AuthError = {
  message: string;
  code?: "EMAIL_EXISTS" | "INVALID_CREDENTIALS" | "UNKNOWN";
};
// wiring up AuthState Shape
interface AuthState {
  // State of data
  error: AuthError | null; // error from Api
  isLoading: boolean; // Loading state for Auth check

  //Actions
  setError: (error: AuthError | null) => void; // Set Error
  setLoading: (loading: boolean) => void; // Control loading state, and use in auth initialization and Api calls
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

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },
  }))
);
