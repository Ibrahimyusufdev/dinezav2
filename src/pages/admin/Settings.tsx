import { Settings as SettingsIcon } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const Settings = () => {
  return (
    <PagePlaceholder
      icon={SettingsIcon}
      title="Settings coming soon"
      description="Platform configuration, fees and policy controls land here."
    />
  );
};

export default Settings;
