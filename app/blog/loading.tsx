import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-6 w-96 max-w-full" />
      </div>

      {/* Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Tag filters */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Tag filter buttons skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-md" />
              ))}
            </div>
          </div>

          {/* Right side: Search input skeleton */}
          <Skeleton className="h-10 w-full md:w-80 rounded-md" />
        </div>

        {/* Results count skeleton */}
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden flex flex-col">
            {/* Image skeleton */}
            <Skeleton className="aspect-video w-full" />

            <CardContent className="flex flex-col flex-grow p-6 space-y-4">
              {/* Date and read time */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-6 w-full" />

              {/* Excerpt */}
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              {/* Button */}
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
