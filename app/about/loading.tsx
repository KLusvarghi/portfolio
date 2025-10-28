import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeaderSkeleton } from "@/components/loading"

export default function AboutLoading() {
  return (
    <div className="container pt-10 md:py-12">
      <div className="grid lg:gap-12 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <PageHeaderSkeleton />

          <Card className="border-2">
            <CardContent className="p-8 space-y-4">
              <Skeleton width={128} height={16} />
              <Skeleton height={32} />
              <Skeleton width="75%" height={32} />
              <div className="space-y-2">
                <Skeleton count={3} height={16} />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Skeleton width={128} height={32} />
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton width={48} height={48} borderRadius="9999px" containerClassName="flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width={256} height={24} />
                    <Skeleton width={192} height={16} />
                    <Skeleton width={128} height={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Skeleton width={192} height={20} />
          </div>

          <div className="space-y-6">
            <Skeleton width={128} height={32} />
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton width={48} height={48} borderRadius="9999px" containerClassName="flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width={256} height={24} />
                    <Skeleton width={192} height={16} />
                    <Skeleton width={128} height={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Skeleton width={192} height={20} />
          </div>

          <div className="space-y-6">
            <Skeleton width={128} height={32} />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 auto-rows-fr">
              <Card className="border-2 row-span-2 sm:row-span-1">
                <CardContent className="p-6 space-y-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={128} height={20} />
                  <Skeleton count={2} height={16} />
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6 space-y-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={96} height={20} />
                  <Skeleton height={16} />
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton width={40} height={40} borderRadius="0.5rem" />
                    <Skeleton width={40} height={40} borderRadius="0.5rem" />
                    <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  </div>
                  <Skeleton width={128} height={20} />
                  <Skeleton height={12} />
                </CardContent>
              </Card>
              <Card className="border-2 sm:order-last">
                <CardContent className="p-6 space-y-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={96} height={20} />
                  <Skeleton height={16} />
                </CardContent>
              </Card>
              <Card className="border-2 col-span-2">
                <CardContent className="p-6 space-y-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={192} height={20} />
                  <Skeleton count={2} height={16} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-2 lg:hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <Skeleton width={80} height={80} borderRadius="9999px" containerClassName="flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton width={128} height={24} />
                  <Skeleton width={192} height={16} />
                  <Skeleton width={160} height={16} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Skeleton width={20} height={20} borderRadius="9999px" />
                <Skeleton width={20} height={20} borderRadius="9999px" />
                <Skeleton width={20} height={20} borderRadius="9999px" />
              </div>
              <Skeleton height={40} />
            </CardContent>
          </Card>

          <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:py-6 lg:justify-between">
            <div className="flex flex-col items-center text-center space-y-4">
              <Skeleton width={200} height={250} borderRadius="0.5rem" />
              <div className="space-y-2">
                <Skeleton width={128} height={24} containerClassName="mx-auto" />
                <Skeleton width={192} height={16} containerClassName="mx-auto" />
                <Skeleton width={160} height={16} containerClassName="mx-auto" />
              </div>
            </div>
            <div className="space-y-4 px-4">
              <div className="space-y-2">
                <Skeleton count={3} height={20} />
              </div>
              <Skeleton height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
