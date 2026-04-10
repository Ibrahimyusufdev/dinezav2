import { useAuthListener } from "../hooks/useAuthListener";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuthListener();
  return <>{children}</>;
};
