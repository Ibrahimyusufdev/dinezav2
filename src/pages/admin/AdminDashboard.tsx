import { LayoutDashboard } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const AdminDashboard = () => {
  return (
    <PagePlaceholder
      icon={LayoutDashboard}
      title="Admin overview coming soon"
      description="Platform health, growth metrics and recent activity at a glance."
    />
  );
};

export default AdminDashboard;
