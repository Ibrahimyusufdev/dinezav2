export const ROUTES = {
  // Public
  HOME: "/",
  HOW_IT_WORKS: "how-it-works",
  FOR_WOMEN: "for-women",
  FOR_RESTAURANT: "for-restaurant",
  SUCCESS_STORIES: "success-stories",

  // Can only be access if not logged in
  LOGIN: "login",
  REGISTER_SELECT: "register",
  DINER_REGISTER: "diner/register",
  RESTAURANT_REGISTER: "restaurant/register",

  // Error
  UNAUTHORIZED: "unauthorized",

  // Diner dashboard
  DINER_DASHBOARD: "diner",
  DINER_EXPLORE: "diner/explore",
  DINER_RESERVATIONS: "diner/reservations",
  DINER_EARNINGS: "diner/earnings",
  DINER_INVITE: "diner/invite",
  DINER_MESSAGES: "diner/messages",
  DINER_PROFILE: "diner/profile",
  DINER_SETTINGS: "diner/settings",
  DINER_NOTIFICATIONS: "diner/notifications",

  // Restaurant dashboard
  RESTAURANT_DASHBOARD: "restaurant",
  RESTAURANT_RESERVATION: "restaurant/reservations",
  RESTAURANT_OFFER: "restaurant/offer",
  RESTAURANT_ANALYTICS: "restaurant/analytics",
  RESTAURANT_INVITE: "restaurant/invite",
  RESTAURANT_PAYMENT: "restaurant/payment",
  RESTAURANT_MESSAGES: "restaurant/messages",
  RESTAURANT_PROFILE: "restaurant/profile",
  RESTAURANT_SETTINGS: "restaurant/settings",
  RESTAURANT_NOTIFICATIONS: "restaurant/notifications",

  // Admin dashboard
  ADMIN_DASHBOARD: "admin",
  ADMIN_USERS: "admin/users",
  ADMIN_RESTAURANTS: "admin/restaurants",
  ADMIN_RESERVATIONS: "admin/reservations",
  ADMIN_TRANSACTIONS: "admin/transactions",
  ADMIN_ANALYTICS: "admin/analytics",
  ADMIN_MESSAGES: "admin/messages",
  ADMIN_SETTINGS: "admin/settings",
  ADMIN_NOTIFICATIONS: "admin/notifications",
} as const;

export const EXTERNAL_LINKS = {
  SUPPORT_EMAIL: "support@dineza.com",
  SUPPORT_PHONE: "(234) 706-893-6114",
  TERMS_OF_SERVICE: "/terms",
  PRIVACY_POLICY: "/privacy",
  INSTAGRAM: "https://instagram.com/ibrahimyusufdev",
  FACEBOOK: "https://facebook.com/",
  TWITTER: "https://x.com/ibrahimyusufdev",
  GITHUB: "https://github.com/ibrahimyusufdev",
} as const;
