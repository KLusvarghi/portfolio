import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsDetailsLoading() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-6 w-96 max-w-full" />
      </div>

      {/* Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Tech filters + Category dropdown */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Tech filter buttons skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-md" />
              ))}
            </div>
            {/* Category dropdown skeleton */}
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>

          {/* Right side: Search input skeleton */}
          <Skeleton className="h-10 w-full md:w-80 rounded-md" />
        </div>

        {/* Results count skeleton */}
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden flex flex-col">
            {/* Image skeleton */}
            <Skeleton className="aspect-video w-full" />

            <CardContent className="flex flex-col flex-grow p-6 space-y-4">
              {/* Title */}
              <Skeleton className="h-6 w-3/4" />

              {/* Description */}
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
