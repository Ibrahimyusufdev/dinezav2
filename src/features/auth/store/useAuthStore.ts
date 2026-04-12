import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {persist} from "zustand/middleware"

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
  email: string | null;

  //Actions
  setError: (error: AuthError | null) => void; // Set Error
  setLoading: (loading: boolean) => void; // Control loading state, and use in auth initialization and Api calls
  clearError: () => void;
  setEmail: (email: string | null) => void;
}

// Auth Store - Global Authentication state using supabase

export const useAuthStore = create<AuthState>()(
  immer(persist((set) => ({
    // Setting initial state
    user: null,
    error: null,
    isLoading: false,
    email: null,

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

    setEmail: (email) => {
      set((state) => {
        state.email = email;
      });
    },
  }), {
    name: "dineza-auth",
    partialize: (state) => ({
      email: state.email,
    })
  })
));
