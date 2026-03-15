import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";


import type { UserRole } from "@/shared/types/common";

// Base User Interface - where I will extend the shape for Diner, Restaurant and admin
export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePicture?: string;
  phoneNumber?: string;
  avatar?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// Diner User - extending from Base User with specific field added
export interface Diner extends BaseUser {
  role: "diner";
  preferredLocations?: string[];
  totalEarnings?: number;
  pendingEarnings?: number;
  availableBalance?: number;
}

// Restaurant User - extending from Base User with specific field added
export interface Restaurant extends BaseUser {
  role: "restaurant";
  restaurantName?: string;
  restaurantLogo?: string;
  businessEmail?: string;
  address?: string;
  cuisineType?: string;
  isVerified?: boolean;
  rating?: number;
  totalReservations?: number;
  pendingReservations?: number;
}

// Admin User - extending from Base User with specific field added
export interface Admin extends BaseUser {
  role: "admin";
  
}

// Making user to be either Diner or Restaurant using discriminated Union in TS for AuthPurpose
export type AuthUser = Diner | Restaurant | Admin;

// wiring up AuthState
export interface AuthState {
  // State of data
  user: AuthUser | null; // Current logged in user or null
  accessToken: string | null; // short-lived token used to authenticate user
  error?: string | null; // error from Api

  isAuthenticated: boolean; // Quick boolean check control to tell that a user is authenticated or not
  isLoading: boolean; // Loading state for Auth check
  // isCheckingAuth: boolean; // Boolean check if user is authenticated or not, use it to check on app//component mounted

  //Actions

  // Set Auth - called after successful login/register, and also set User and token, and mark as authenticated
  setAuth: (user: AuthUser, accessToken: string) => void;

  // Set access token in memory
  setAccessToken: (token: string | null) => void;

  // Control loading state, and use in auth initialization and Api calls
  setLoading?: (loading: boolean) => void;

  // Partially update user data
  updateAuthUser?: (userData: Partial<AuthUser>) => void;

  // Clears all auth data and reset to initial state
  logout: () => void;
}

/**
Auth Store - Global Authentication state, persisted to localstorage, so users stay logged in
 */

export const useAuthStore = create<AuthState>()(
  immer(
    persist(
      (set) => ({
        // Setting initial state
        user: {
          id: "1",
          email: "Ibrahimyusuf1304@gmail.com",
          firstName: "Ibrahim",
          lastName: "Yusuf",
          role: "restaurant",
          // preferredLocations: ["Kaduna", "Lagos"]
        },
        accessToken: null,
        isAuthenticated: true,
        isLoading: false, 

        // Action implementation
        setAuth: (user, accessToken) => {
          set((state) => {
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
        },

        setAccessToken: (token) => {
          set((state) => {
            state.accessToken = token;
            state.isAuthenticated = true;
          });
        },

        setLoading: (loading) => {
          set((state) => {
            state.isLoading = loading;
          });
        },

        logout: () => {
          set((state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          });
        },
      }),
      {
        name: "dineza-auth",
        partialize: (state) => ({
          user: state.user,
        }),
      }
    )
  )
);