import { CreditCard } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const PaymentsPage = () => {
  return (
    <PagePlaceholder
      icon={CreditCard}
      title="Payments coming soon"
      description="Payouts, invoices and statements will live here."
    />
  );
};

export default PaymentsPage;
