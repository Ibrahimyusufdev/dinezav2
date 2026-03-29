

export const getInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.trim()?.[0] ?? "";
  const last = lastName?.trim()?.[0] ?? "";

  const initials = (first + last).toUpperCase();

  // Fallback: if both are empty, return a default placeholder
  return initials || "?";
};