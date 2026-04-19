import { Skeleton } from "@/components/ui/skeleton";
import ContentWrapper from "../ContentWrapper";

interface ListSkeletonProps {
  /**
   * Number of list item skeletons to display
   * @default 5
   */
  itemCount?: number;
  /**
   * Whether to show header skeleton
   * @default true
   */
  showHeader?: boolean;
  /**
   * Display as table (with columns) or simple list
   * @default 'table'
   */
  variant?: "table" | "simple";
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * ListSkeleton Component
 *
 * Skeleton loader for list and table views.
 * Supports both table-style and simple list layouts.
 *
 * @example
 * ```tsx
 * if (isLoading) return <ListSkeleton variant="table" itemCount={10} />;
 * ```
 */
export const ListSkeleton = ({
  itemCount = 5,
  showHeader = true,
  variant = "table",
  className,
}: ListSkeletonProps) => {
  if (variant === "simple") {
    return (
      <ContentWrapper>
        <div
          className={`min-h-screen space-y-4 px-4 py-8 ${className || ""}`}
          role="status"
          aria-label="List loading"
        >
          {showHeader && (
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-4 w-96 rounded-md" />
            </div>
          )}

          <div className="space-y-2">
            {Array.from({ length: itemCount }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        </div>
      </ContentWrapper>
    );
  }

  // Table variant
  return (
    <ContentWrapper>
      <div
        className={`min-h-screen space-y-6 px-4 py-8 ${className || ""}`}
        role="status"
        aria-label="Table loading"
      >
        {showHeader && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
        )}

        {/* Table-like Layout */}
        <div className="space-y-0 overflow-hidden rounded-lg border border-muted">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 border-b border-muted bg-muted/50 p-4">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 border-b border-muted p-4 last:border-b-0"
            >
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};
