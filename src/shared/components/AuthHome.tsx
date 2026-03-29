import { Link } from "react-router-dom";
import { logo } from "@/assets";
import { ROUTES } from "../types/constants";

const AuthHome = () => {
  return (
    <Link to={ROUTES.HOME} className="absolute top-6 left-6 flex items-center gap-2">
      <div className="bg-sidebar-secondary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <img src={logo} alt="Dineza logo" className="h-8 w-8" />
      </div>
      <span className="font-medium">Dineza</span>
    </Link>
  );
};

export default AuthHome;
