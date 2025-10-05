import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function HomeLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container h-full flex flex-col py-16">
        {/* Hero Section Skeleton */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <Skeleton className="h-16 w-48 rounded-full" />
          <Skeleton className="h-12 w-96 max-w-full" />
          <Skeleton className="h-6 w-64" />
          <div className="flex gap-4 mt-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Professional Summary Section Skeleton */}
        <div className="mt-16 pt-16 border-t border-border/50 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-48" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-32 mt-4" />
          </div>
        </div>

        {/* Featured Projects Section Skeleton */}
        <div className="mt-24 w-full">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* YouTube Videos Section Skeleton */}
        <div className="mt-24 pt-16 border-t border-border/50 w-full">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-4 pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
