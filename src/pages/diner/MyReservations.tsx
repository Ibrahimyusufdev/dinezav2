import { CalendarCheck } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const MyReservations = () => {
  return (
    <PagePlaceholder
      icon={CalendarCheck}
      title="Reservations coming soon"
      description="Track upcoming, past and cancelled reservations from one place."
    />
  );
};

export default MyReservations;
