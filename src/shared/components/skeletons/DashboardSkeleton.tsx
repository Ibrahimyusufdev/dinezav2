import { Skeleton } from "@/components/ui/skeleton";
import ContentWrapper from "../ContentWrapper";

interface DashboardSkeletonProps {
  /**
   * Number of card skeletons to display
   * @default 6
   */
  cardCount?: number;
  /**
   * Whether to show header skeleton
   * @default true
   */
  showHeader?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * DashboardSkeleton Component
 *
 * Grid-based skeleton loader for dashboard pages.
 * Displays multiple card skeletons in a responsive grid layout.
 *
 * @example
 * ```tsx
 * if (isLoading) return <DashboardSkeleton cardCount={8} />;
 * ```
 */
export const DashboardSkeleton = ({
  cardCount = 6,
  showHeader = true,
  className,
}: DashboardSkeletonProps) => {
  return (
    <ContentWrapper>
      <div
        className={`min-h-screen space-y-8 px-4 py-8 ${className || ""}`}
        role="status"
        aria-label="Dashboard loading"
      >
        {/* Header Skeleton */}
        {showHeader && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-lg border border-muted bg-card p-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32 rounded-md" />
                <Skeleton className="h-6 w-12 rounded-md" />
              </div>

              {/* Card Content */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Card Footer */}
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 flex-1 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};
