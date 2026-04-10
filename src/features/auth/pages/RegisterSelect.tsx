import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";

export const RegisterSelect = () => {
  const { logout } = useLogout();
  return (
    <>
      <h1>Register Select</h1>

      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default RegisterSelect;
