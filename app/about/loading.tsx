import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutLoading() {
  return (
    <div className="container py-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        {/* Main Content Skeleton */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-96 max-w-full" />
          </div>

          {/* Introduction Card */}
          <Card className="border-2">
            <CardContent className="p-8 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>

          {/* Career Section */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            {/* Current Role */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Previous Roles Toggle */}
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Education Section */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            {/* Current Education */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Previous Education Toggle */}
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 auto-rows-fr">
              {/* Cloud & DevOps - tall on mobile */}
              <Card className="border-2 row-span-2 sm:row-span-1">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
              {/* Quality */}
              <Card className="border-2">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
              {/* Main Stack */}
              <Card className="border-2">
                <CardContent className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <Skeleton className="w-10 h-10 rounded-lg" />
                  </div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
              {/* Database */}
              <Card className="border-2 sm:order-last">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
              {/* Architecture - wide */}
              <Card className="border-2 col-span-2">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Mobile Sidebar */}
          <Card className="border-2 lg:hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>

          {/* Desktop Sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:py-6 lg:justify-between">
            <div className="flex flex-col items-center text-center space-y-4">
              <Skeleton className="w-[200px] h-[250px] rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
            </div>
            <div className="space-y-4 px-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
