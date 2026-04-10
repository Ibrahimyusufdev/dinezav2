//  For relative path
export const PATHS = {
  // Diner dashboard
  DINER: {
    ROOT: "/diner",
    EXPLORE: "explore",
    RESERVATIONS: "reservations",
    EARNINGS: "earnings",
    INVITE: "invite",
    MESSAGES: "messages",
    PROFILE: "profile",
    SETTINGS: "settings",
  },

  // Restaurant dashboard
  RESTAURANT: {
    ROOT: "/restaurant",
    RESERVATIONS: "reservations",
    SPECIAL_OFFER: "special-offer",
    ANALYTICS: "analytics",
    INVITE: "invite",
    PAYMENT: "payment",
    MESSAGES: "messages",
    PROFILE: "profile",
    SETTINGS: "settings",
  },

  // Admin dashboard
  ADMIN: {
    ROOT: "/admin",
    USERS: "users",
    RESTAURANTS: "restaurants",
    TRANSACTIONS: "transactions",
    ANALYTICS: "analytics",
    RESERVATIONS: "reservations",
    SETTINGS: "settings",
    NOTIFICATIONS: "notifications",
    MESSAGES: "messages",
    PROFILE: "profile",
  },
} as const;

// Landing page pathID, single page
export const LandingID = {
  HOW_IT_WORKS: "how-it-works",
  FOR_WOMEN: "for-women",
  FOR_RESTAURANT: "for-restaurant",
  SUCCESS_STORIES: "success-stories",
} as const;

// Full absolute path
export const ROUTES = {
  // Public
  HOME: "/",
  FAQ: "faq",
  ABOUT_US: "about-us",
  CONTACT_US: "contact-us",

  // Can only be access if not logged in (Guest Route)
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_SELECT: "/register-select",
  FORGET_PASSWORD: "/forget-password",
  CONFIRM_EMAIL: "/confirm-email",
  AUTH_CALLBACK: "auth/callback",

  // Error
  UNAUTHORIZED: "/unauthorized",

  // Diner dashboard
  DINER_DASHBOARD: "/diner",
  DINER_EXPLORE: "/diner/explore",
  DINER_RESERVATIONS: "/diner/reservations",
  DINER_EARNINGS: "/diner/earnings",
  DINER_INVITE: "/diner/invite",
  DINER_MESSAGES: "/diner/messages",
  DINER_PROFILE: "/diner/profile",
  DINER_SETTINGS: "/diner/settings",
  DINER_NOTIFICATIONS: "/diner/notifications",

  // Restaurant dashboard
  RESTAURANT_DASHBOARD: "/restaurant",
  RESTAURANT_RESERVATION: "/restaurant/reservations",
  RESTAURANT_OFFER: "/restaurant/special-offer",
  RESTAURANT_ANALYTICS: "/restaurant/analytics",
  RESTAURANT_INVITE: "/restaurant/invite",
  RESTAURANT_PAYMENT: "/restaurant/payment",
  RESTAURANT_MESSAGES: "/restaurant/messages",
  RESTAURANT_PROFILE: "/restaurant/profile",
  RESTAURANT_SETTINGS: "/restaurant/settings",
  RESTAURANT_NOTIFICATIONS: "/restaurant/notifications",

  // Admin dashboard
  ADMIN_DASHBOARD: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_RESTAURANTS: "/admin/restaurants",
  ADMIN_RESERVATIONS: "/admin/reservations",
  ADMIN_TRANSACTIONS: "/admin/transactions",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_MESSAGES: "/admin/messages",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_PROFILE: "/admin/profile",
} as const;

export const EXTERNAL_LINKS = {
  SUPPORT_EMAIL: "ibrahim.techresources@gmail.com",
  SUPPORT_PHONE: "(234) 706-893-6114",
  HELP: "/help",
  TERMS_OF_SERVICE: "/terms-of-service",
  PRIVACY_POLICY: "/privacy-policy",
  INSTAGRAM: "https://instagram.com/ibrahimyusufdev",
  FACEBOOK: "https://facebook.com/",
  TWITTER: "https://x.com/ibrahimyusufdev",
  GITHUB: "https://github.com/ibrahimyusufdev",
} as const;
