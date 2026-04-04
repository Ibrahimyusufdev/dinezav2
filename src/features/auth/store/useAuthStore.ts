import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types/auth.types";

// wiring up AuthState Shape
interface AuthState {
  // State of data
  user: AuthUser | null; // Current logged in user or null
  error: string | null; // error from Api
  isAuthenticated: boolean; // Quick boolean check control to tell that a user is authenticated or not
  isLoading: boolean; // Loading state for Auth check
  // isCheckingAuth: boolean; // Boolean check if user is authenticated or not, use it to check on app//component mounted

  //Actions

  setAuth: () => void; // Set Auth - called after successful login/register, and also mark as authenticated
  setUser: (user: AuthUser) => void // Set the user to database after succesfully entering data to be sent to the database, and setUser and mark and isAuthenticated
  setError: (error: string | null) => void; // Set Error
  setLoading: (loading: boolean) => void; // Control loading state, and use in auth initialization and Api calls
  
  // updateAuthUser: (userData: Partial<AuthUser>) => void; // Partially update user data

  // checkAuth: () => void;   // Check Auth

  clearAuth: () => void; // Clears all auth data and reset to initial state
  clearError: () => void;
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
        error: null,
        isAuthenticated: false,
        isLoading: false,

        // Called after successful login or register
        setAuth: () => {
          set((state) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
          });
        },
        // Called after entering data to be sent to the database (After filling diner or restaurant form)
        setUser: (user) => {
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
          })
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
        // updateAuthUser: (userData) => {
        //   set((state) => {
        //     if (state.user) {
        //       state.user = { ...state.user, ...userData };
        //     }
        //   });
        // },

        // Resets everything back to initial state
        clearAuth: () => {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
          });
        },

        clearError: () => {
          set((state) => {
            state.error = null;
          })
        }
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
