import { ArrowLeftRight } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const Transactions = () => {
  return (
    <PagePlaceholder
      icon={ArrowLeftRight}
      title="Transactions coming soon"
      description="Audit payouts, refunds and fees across the platform."
    />
  );
};

export default Transactions;
