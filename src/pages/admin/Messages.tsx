import { MessagesSquare } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const Messages = () => {
  return (
    <PagePlaceholder
      icon={MessagesSquare}
      title="Messages coming soon"
      description="Support and broadcast conversations live here."
    />
  );
};

export default Messages;
