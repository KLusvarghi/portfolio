import {
  ProjectCardSkeleton,
  FilterBarSkeleton,
  PageHeaderSkeleton,
} from "@/components/loading"

export default function ProjectsLoading() {
  return (
    <div className="container pt-12">
      {/* Header with bottom margin */}
      <div className="mb-8">
        <PageHeaderSkeleton />
      </div>

      {/* Filter bar with bottom margin and vertical spacing */}
      <div className="mb-6 space-y-4">
        <FilterBarSkeleton />
      </div>

      {/* Projects grid with bottom margin */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
