import {
  ProjectCardSkeleton,
  FilterBarSkeleton,
  PageHeaderSkeleton,
} from "@/components/loading"

export default function ProjectsLoading() {
  return (
    <div className="container py-12">
      <PageHeaderSkeleton />
      <FilterBarSkeleton />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
