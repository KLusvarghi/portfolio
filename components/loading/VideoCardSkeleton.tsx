import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" style={{ lineHeight: 'unset' }} />

      <CardContent className="p-6 space-y-3">
        <Skeleton width="100%" height={24} />
        <Skeleton width="75%" height={16} />

        <div className="flex items-center gap-4 pt-2">
          <Skeleton width={80} height={16} />
          <Skeleton width={80} height={16} />
        </div>
      </CardContent>
    </Card>
  )
}
