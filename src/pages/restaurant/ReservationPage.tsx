import { CalendarClock } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const ReservationPage = () => {
  return (
    <PagePlaceholder
      icon={CalendarClock}
      title="Reservation manager coming soon"
      description="Confirm, reschedule and seat guests from a single timeline view."
    />
  );
};

export default ReservationPage;
