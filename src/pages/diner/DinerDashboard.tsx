import { LayoutDashboard } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const DinerDashboard = () => {
  return (
    <PagePlaceholder
      icon={LayoutDashboard}
      title="Your dashboard is on the way"
      description="A snapshot of your reservations, cash back and recommended restaurants will live here."
    />
  );
};

export default DinerDashboard;
