import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../types/constants";

export const Logo = () => {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2">
      <div className="from-primary flex h-8 w-8 items-center justify-center rounded-2xl bg-linear-to-tr via-orange-500 to-amber-400">
        <UtensilsCrossed size={16} className="text-white" strokeWidth={3} />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">Dineza</span>
    </Link>
  );
};
