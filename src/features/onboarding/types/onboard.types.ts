// Diner payload
export interface OnboardDinerPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferredDiningLocations: string[];
  avatarFile?: File | null;
}

// Restaurant payload
export interface OnboardRestaurantPayload {
  firstName: string;
  lastName: string;
  restaurantName: string;
  businessEmail: string;
  address: string;
  cuisineType: string[];
  contactName: string;
  contactPhone: string;

  logoFile?: File;
  imageFiles?: File[];
  documentFiles?: File[];
}

// Location types
export interface Location {
  id: string;
  name: string;
}
