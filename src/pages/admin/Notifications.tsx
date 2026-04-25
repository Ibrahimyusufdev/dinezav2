import { Bell } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const Notifications = () => {
  return (
    <PagePlaceholder
      icon={Bell}
      title="Notifications coming soon"
      description="System alerts and broadcast tools — in development."
    />
  );
};

export default Notifications;
