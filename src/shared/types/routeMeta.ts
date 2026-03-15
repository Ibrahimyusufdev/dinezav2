export const ROUTE_META = {
  // Diner
  DINER: {
    DASHBOARD: {
      title: "Dashboard",
      description: "Welcome back! Here's what's happening.",
      icon: "layout-dashboard",
      requiresAuth: true,
    },
    EXPLORE: {
      title: "Explore Restaurants",
      description: "Discover and book restaurants near you.",
      icon: "search",
      requiresAuth: true,
    },
    RESERVATIONS: {
      title: "My Reservations",
      description: "View and manage your upcoming reservations.",
      icon: "calendar",
      requiresAuth: true,
    },
    EARNINGS: {
      title: "Earnings",
      description: "Track your rewards and earnings.",
      icon: "wallet",
      requiresAuth: true,
    },
    INVITE: {
      title: "Invite Friends",
      description: "Invite friends and earn rewards together.",
      icon: "users",
      requiresAuth: true,
    },
    MESSAGES: {
      title: "Messages",
      description: "Chat with restaurants and support.",
      icon: "message-circle",
      requiresAuth: true,
    },
    PROFILE: {
      title: "My Profile",
      description: "Manage your personal information.",
      icon: "user",
      requiresAuth: true,
    },
  },

  // Restaurant
  RESTAURANT: {
    DASHBOARD: {
      title: "Dashboard",
      description: "Overview of your restaurant's activity.",
      icon: "layout-dashboard",
      requiresAuth: true,
    },
    RESERVATIONS: {
      title: "Reservations",
      description: "View and manage incoming reservations.",
      icon: "calendar",
      requiresAuth: true,
    },
    SPECIAL_OFFER: {
      title: "Special Offers",
      description: "Create and manage your special offers.",
      icon: "tag",
      requiresAuth: true,
    },
    ANALYTICS: {
      title: "Analytics",
      description: "Track your restaurant's performance.",
      icon: "bar-chart",
      requiresAuth: true,
    },
    INVITE: {
      title: "Invite",
      description: "Invite staff and partners.",
      icon: "users",
      requiresAuth: true,
    },
    PAYMENT: {
      title: "Payments",
      description: "Manage payouts and payment settings.",
      icon: "credit-card",
      requiresAuth: true,
    },
    MESSAGES: {
      title: "Messages",
      description: "Communicate with diners and support.",
      icon: "message-circle",
      requiresAuth: true,
    },
    PROFILE: {
      title: "Restaurant Profile",
      description: "Manage your restaurant's public profile.",
      icon: "store",
      requiresAuth: true,
    },
  },

  // Admin
  ADMIN: {
    DASHBOARD: {
      title: "Admin Dashboard",
      description: "Platform-wide overview and controls.",
      icon: "layout-dashboard",
      requiresAuth: true,
    },
    USERS: {
      title: "Manage Users",
      description: "View, edit, and manage all platform users.",
      icon: "users",
      requiresAuth: true,
    },
    RESTAURANTS: {
      title: "Manage Restaurants",
      description: "Review and manage restaurant accounts.",
      icon: "store",
      requiresAuth: true,
    },
    RESERVATIONS: {
      title: "Reservations",
      description: "Monitor all reservations across the platform.",
      icon: "calendar",
      requiresAuth: true,
    },
    TRANSACTIONS: {
      title: "Transactions",
      description: "View and audit all platform transactions.",
      icon: "receipt",
      requiresAuth: true,
    },
    ANALYTICS: {
      title: "Analytics",
      description: "Platform-wide performance and insights.",
      icon: "bar-chart",
      requiresAuth: true,
    },
    MESSAGES: {
      title: "Messages",
      description: "Platform-wide messaging and support.",
      icon: "message-circle",
      requiresAuth: true,
    },
    SETTINGS: {
      title: "Settings",
      description: "Configure platform-wide settings.",
      icon: "settings",
      requiresAuth: true,
    },
    NOTIFICATIONS: {
      title: "Notifications",
      description: "Manage and send platform notifications.",
      icon: "bell",
      requiresAuth: true,
    },
    PROFILE: {
      title: "Admin Profile",
      description: "Manage your admin account.",
      icon: "user",
      requiresAuth: true,
    },
  },
} as const;