import { UtensilsCrossed } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const ManageRestaurants = () => {
  return (
    <PagePlaceholder
      icon={UtensilsCrossed}
      title="Restaurant management coming soon"
      description="Approve, suspend and edit restaurant accounts from one table."
    />
  );
};

export default ManageRestaurants;
