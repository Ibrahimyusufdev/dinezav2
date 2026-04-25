import { MessagesSquare } from "lucide-react";
import { PagePlaceholder } from "@/shared/components/PagePlaceholder";

export const MessagingPage = () => {
  return (
    <PagePlaceholder
      icon={MessagesSquare}
      title="Messaging coming soon"
      description="Chat with restaurants and support — in development."
    />
  );
};

export default MessagingPage;
