import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeaderSkeleton } from "@/components/loading"

export default function AboutLoading() {
  return (
    <div className="container pt-10 md:py-12">
      <div className="grid lg:gap-12 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-0">
          <PageHeaderSkeleton />

          <div className="flex flex-col gap-6 mb-8">
            <Card className="border-2 lg:hidden">
              <CardContent className="p-6 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <Skeleton width={80} height={80} borderRadius="9999px" containerClassName="flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton width={128} height={24} />
                    <Skeleton width={192} height={16} />
                    <Skeleton width={160} height={16} />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Skeleton width={26} height={26} borderRadius="9999px" />
                  <Skeleton width={26} height={26} borderRadius="9999px" />
                  <Skeleton width={26} height={26} borderRadius="9999px" />
                </div>
                <Skeleton height={40} />
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 flex flex-col gap-4">
              <Skeleton width={128} height={16} />
              <div className="flex flex-col gap-2">
                <Skeleton height={32} />
                <Skeleton width="75%" height={32} />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton height={16} />
                <Skeleton height={16} />
                <Skeleton height={16} />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 mt-10">
            <Skeleton width={128} height={32} />
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton width={48} height={48} borderRadius="9999px" containerClassName="flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton width={256} height={24} />
                    <Skeleton width={192} height={16} />
                    <Skeleton width={128} height={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Skeleton width={192} height={20} />
          </div>

          <div className="flex flex-col gap-6 mt-10">
            <Skeleton width={128} height={32} />
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton width={48} height={48} borderRadius="9999px" containerClassName="flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton width={256} height={24} />
                    <Skeleton width={192} height={16} />
                    <Skeleton width={128} height={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Skeleton width={192} height={20} />
          </div>

          <div className="flex flex-col gap-6 mt-10">
            <Skeleton width={128} height={32} />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 auto-rows-fr">
              <Card className="border-2 row-span-2 sm:row-span-1">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={128} height={20} />
                  <div className="flex flex-col gap-2">
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={96} height={20} />
                  <Skeleton height={16} />
                </CardContent>
              </Card>
              {/* esse */}
              <Card className="border-2 row-span-2 sm:row-span-1">
                <CardContent className="p-6 flex flex-col gap-3">
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
                <CardContent className="p-6 flex flex-col gap-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={96} height={20} />
                  <Skeleton height={16} />
                </CardContent>
              </Card>
              <Card className="border-2 col-span-2">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Skeleton width={40} height={40} borderRadius="0.5rem" />
                  <Skeleton width={192} height={20} />
                  <div className="flex flex-col gap-2">
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:py-6 ">
            <div className="flex flex-col items-start text-start gap-4">
              <Skeleton width={300} height={520} borderRadius="0.5rem" />
              <div className="flex flex-col gap-2">
                <Skeleton width={240} height={26} />
                <Skeleton width={200} height={22} />
                <Skeleton width={180} height={22} />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton height={20} width={160} />
                <Skeleton height={20} width={160} />
                <Skeleton height={20} width={160} />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton height={32} width={300}/>
                <Skeleton height={32} width={300}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
