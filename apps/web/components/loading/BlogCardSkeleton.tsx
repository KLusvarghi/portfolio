import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="aspect-video w-full" style={{ lineHeight: 'unset' }} />

      <CardContent className="flex flex-col flex-grow p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton width={80} height={16} />
            <Skeleton width={64} height={16} />
          </div>
          <Skeleton width={32} height={32} borderRadius="9999px" />
        </div>

        <Skeleton width="100%" height={24} />

        <div className="space-y-2 flex-grow">
          <Skeleton count={3} height={16} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton width={80} height={24} borderRadius="9999px" />
          <Skeleton width={64} height={24} borderRadius="9999px" />
          <Skeleton width={96} height={24} borderRadius="9999px" />
        </div>

        <Skeleton width={128} height={36} />
      </CardContent>
    </Card>
  )
}
