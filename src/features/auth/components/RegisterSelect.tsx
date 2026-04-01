import { useNavigate } from "react-router-dom";
import { useRequiredUser } from "../hooks/use-auth-store";
import { createRoleProfile } from "../utils/createRoleProfile";
import { fetchAndMergeProfile } from "../utils/fetchAndMergeProfile";


export const RegisterSelect = () => {
const user = useRequiredUser();
const navigate = useNavigate();

  const assignRole = async(role: "diner" | "restaurant") => {
    try {
      await createRoleProfile(user.id, role);

      const fullUser = await fetchAndMergeProfile(user.id);

      if (fullUser) {
        
      }
    } catch (error) {
      
    }
  }
  return (
    <div>RegisterSelect</div>
  )
}
