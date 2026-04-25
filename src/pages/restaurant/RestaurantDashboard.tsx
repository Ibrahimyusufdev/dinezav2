import { LayoutDashboard } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const RestaurantDashboard = () => {
  return (
    <PagePlaceholder
      icon={LayoutDashboard}
      title="Restaurant overview coming soon"
      description="Today's reservations, covers and revenue at a glance — in development."
    />
  );
};

export default RestaurantDashboard;
