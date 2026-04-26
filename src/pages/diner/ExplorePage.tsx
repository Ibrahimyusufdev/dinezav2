import { Compass } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const ExplorePage = () => {
  return (
    <PagePlaceholder
      icon={Compass}
      title="Explore restaurants near you"
      description="Browse, filter and book tables at partner restaurants — in development."
    />
  );
};

export default ExplorePage;
