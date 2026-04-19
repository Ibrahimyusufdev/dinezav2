import { Skeleton } from "@/components/ui/skeleton";

interface HeaderSkeletonProps {
  /**
   * Whether to show breadcrumb-like navigation
   * @default false
   */
  showNav?: boolean;
  /**
   * Whether to show action buttons
   * @default false
   */
  showActions?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * HeaderSkeleton Component
 *
 * Page header placeholder with optional navigation and actions.
 *
 * @example
 * ```tsx
 * if (isLoading) return <HeaderSkeleton showNav showActions />;
 * ```
 */
export const HeaderSkeleton = ({
  showNav = false,
  showActions = false,
  className,
}: HeaderSkeletonProps) => {
  return (
    <div
      className={`space-y-4 border-b border-muted px-4 py-6 ${className || ""}`}
      role="status"
      aria-label="Header loading"
    >
      {/* Navigation Breadcrumb */}
      {showNav && (
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      )}

      {/* Title and Description */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-md" />
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      )}
    </div>
  );
};
