import Skeleton from "react-loading-skeleton"
import {
  BlogCardSkeleton,
  PageHeaderSkeleton,
} from "@/components/loading"

export default function BlogLoading() {
  return (
    <div className="container py-12">
      <PageHeaderSkeleton />

      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} width={96} height={32} borderRadius="0.375rem" />
              ))}
            </div>
          </div>

          <Skeleton width={320} height={40} borderRadius="0.375rem" containerClassName="w-full md:w-80" />
        </div>

        <Skeleton width={192} height={16} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
