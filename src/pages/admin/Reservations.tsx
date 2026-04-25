import { CalendarClock } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const Reservations = () => {
  return (
    <PagePlaceholder
      icon={CalendarClock}
      title="Reservations overview coming soon"
      description="Cross-restaurant reservation activity will be visible here."
    />
  );
};

export default Reservations;
