import { useAuthListener } from "@/features/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuthListener();
  return <>{children}</>;
};
