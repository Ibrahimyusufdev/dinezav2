import { UserCircle } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const ProfilePage = () => {
  return (
    <PagePlaceholder
      icon={UserCircle}
      title="Profile settings coming soon"
      description="Update your personal info, preferences and notifications from here."
    />
  );
};

export default ProfilePage;
