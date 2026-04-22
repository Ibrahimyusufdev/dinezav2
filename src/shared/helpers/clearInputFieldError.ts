interface AuthError {
  message: string;
  code?: "EMAIL_EXISTS" | "INVALID_CREDENTIALS" | "UNKNOWN";
}

interface clearInputFieldError {
  fieldOnChange: (...event: any[]) => void;
  error: AuthError | null;
  clearError: () => void;
}

export const clearInputFieldError = ({
  fieldOnChange,
  error,
  clearError,
}: clearInputFieldError) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldOnChange(e);
    if (error) clearError();
  };
};
