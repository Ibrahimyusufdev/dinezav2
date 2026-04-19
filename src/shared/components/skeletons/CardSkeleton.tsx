import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  /**
   * Whether to show image placeholder
   * @default true
   */
  showImage?: boolean;
  /**
   * Number of content lines
   * @default 3
   */
  lineCount?: number;
  /**
   * Custom className for the card container
   */
  className?: string;
}

/**
 * CardSkeleton Component
 *
 * Individual card placeholder component.
 * Can be used within grids or standalone.
 *
 * @example
 * ```tsx
 * <div className="grid grid-cols-3 gap-4">
 *   {isLoading && <CardSkeleton />}
 * </div>
 * ```
 */
export const CardSkeleton = ({
  showImage = true,
  lineCount = 3,
  className,
}: CardSkeletonProps) => {
  return (
    <div
      className={`space-y-3 rounded-lg border border-muted bg-card p-4 ${
        className || ""
      }`}
      role="status"
      aria-label="Card loading"
    >
      {/* Image Placeholder */}
      {showImage && <Skeleton className="h-40 w-full rounded-md" />}

      {/* Title */}
      <Skeleton className="h-6 w-3/4 rounded-md" />

      {/* Content Lines */}
      <div className="space-y-2">
        {Array.from({ length: lineCount }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 rounded-md ${i === lineCount - 1 ? "w-5/6" : "w-full"}`}
          />
        ))}
      </div>

      {/* Action Button */}
      <Skeleton className="mt-4 h-10 w-full rounded-md" />
    </div>
  );
};
