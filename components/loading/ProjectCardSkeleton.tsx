import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="aspect-video w-full" style={{ lineHeight: 'unset' }} />

      <CardContent className="flex flex-col flex-grow p-6 space-y-4">
        <Skeleton width="60%" height={24} />

        <div className="flex flex-col gap-1">
          <Skeleton height={16} />
          <Skeleton height={16} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton width={64} height={22} borderRadius="0.375rem" />
          <Skeleton width={72} height={22} borderRadius="0.375rem" />
          <Skeleton width={56} height={22} borderRadius="0.375rem" />
          <Skeleton width={42} height={22} borderRadius="0.375rem" />
          <Skeleton width={24} height={22} borderRadius="0.375rem" />
        </div>

        <div className="flex gap-2 mt-auto w-full">
          <Skeleton width="120%" height={32} borderRadius="0.375rem" containerClassName="flex-grow" />
          <Skeleton width="80%" height={32} borderRadius="0.375rem" containerClassName="flex flex-1 justify-end align-end" />
        </div>
      </CardContent>
    </Card>
  )
}
