// import { apiClient } from "@/shared/services";
// import { handleApiError } from "@/shared/services";
// import type { ApiResponse } from "@/shared/services";
// import type {
//   LoginPayload,
//   RegisterDinerPayload,
//   RegisterRestaurantPayload,
//   AuthResponse,
// } from "../types/auth.types";


// // All auth-related API calls live here
// // Every function returns ApiResponse<T> — either data or error, never both

// export const authService = {
//   // login
//   login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
//     try {
//       const response = await apiClient.post<AuthResponse>("/auth/login", payload); // Remember to change endpoint to supabase

//       return { data: response.data, error: null };
//     } catch (error) {
//       return { data: null, error: handleApiError(error) };
//     }
//   },

//   // register diner
//   registerDiner: async (payload: RegisterDinerPayload): Promise<ApiResponse<AuthResponse>> => {
//     try {
//       const response = await apiClient.post<AuthResponse>("/auth/register/diner", payload); // Remember to change endpoint to supabase
//       return { data: response.data, error: null };
//     } catch (error) {
//       return { data: null, error: handleApiError(error) };
//     }
//   },

//   // register restaurant
//   registerRestaurant: async (
//     payload: RegisterRestaurantPayload
//   ): Promise<ApiResponse<AuthResponse>> => {
//     try {
//       const response = await apiClient.post<AuthResponse>("/auth/register/restaurant", payload); // Remember to change endpoint to supabase
//       return { data: response.data, error: null };
//     } catch (error) {
//       return { data: null, error: handleApiError(error) };
//     }
//   },

//   // Logout
//   logout: async (): Promise<ApiResponse<null>> => {
//     try {
//       await apiClient.post("/auth/logout");
//       return { data: null, error: null };
//     } catch (error) {
//       return { data: null, error: handleApiError(error) };
//     }
//   },

//   // Called on app mount to verify persisted user is still valid
//   refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
//     try {
//       const response = await apiClient.post<AuthResponse>("/auth/refresh");
//       return { data: response.data, error: null };
//     } catch (error) {
//       return { data: null, error: handleApiError(error) };
//     }
//   },
// };
