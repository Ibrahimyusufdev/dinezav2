import ContentWrapper from "./ContentWrapper";
import { Spinner } from "@/components/ui/spinner";

export const AppLoader = () => {
  return (
    <ContentWrapper>
      <div className="bg-background flex min-h-screen items-center justify-center gap-4">
        <Spinner className="size-12" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </ContentWrapper>
  );
};
