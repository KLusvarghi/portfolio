import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="aspect-video w-full" style={{ lineHeight: 'unset' }} />

      <CardContent className="flex flex-col flex-grow p-6 space-y-4">
        <Skeleton width="75%" height={24} />

        <div className="space-y-2 flex-grow">
          <Skeleton count={3} height={16} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton width={64} height={24} borderRadius="9999px" />
          <Skeleton width={80} height={24} borderRadius="9999px" />
          <Skeleton width={56} height={24} borderRadius="9999px" />
        </div>

        <div className="flex gap-2 mt-auto">
          <Skeleton height={36} containerClassName="flex-1" />
          <Skeleton height={36} containerClassName="flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}
