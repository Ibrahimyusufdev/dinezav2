import { Skeleton } from "@/components/ui/skeleton";
import ContentWrapper from "../ContentWrapper";

interface PageSkeletonProps {
  /**
   * Number of skeleton lines to show (for content simulation)
   * @default 5
   */
  lineCount?: number;
  /**
   * Whether to show a header skeleton at the top
   * @default true
   */
  showHeader?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * PageSkeleton Component
 *
 * Full-page skeleton loader suitable for route guards and page-level loading states.
 * Displays a realistic page structure with header and content lines.
 *
 * @example
 * ```tsx
 * if (isLoading) return <PageSkeleton />;
 * ```
 */
export const PageSkeleton = ({
  lineCount = 5,
  showHeader = true,
  className,
}: PageSkeletonProps) => {
  return (
    <ContentWrapper>
      <div
        className={`min-h-screen space-y-6 px-4 py-8 ${className || ""}`}
        role="status"
        aria-label="Page loading"
      >
        {/* Header Skeleton */}
        {showHeader && (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64 rounded-md" />
            <Skeleton className="h-4 w-full max-w-2xl rounded-md" />
          </div>
        )}

        {/* Content Skeleton Lines */}
        <div className="space-y-3">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className={`space-y-2 ${i === lineCount - 1 ? "max-w-xs" : ""}`}
            >
              <Skeleton
                className={`h-4 w-full rounded-md ${
                  i === lineCount - 1 ? "max-w-xs" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};
