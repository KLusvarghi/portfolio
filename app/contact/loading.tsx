import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto mt-12 md:mt-0">
        {/* Hero Section Skeleton */}
        <div className="mb-8 md:mb-12 text-center">
          <Skeleton
            height={48}
            width="60%"
            containerClassName="mx-auto mb-3 md:mb-4"
          />
          <Skeleton
            height={24}
            width="80%"
            containerClassName="mx-auto"
          />
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Email and Location Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Email Card Skeleton */}
            <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                  <Skeleton
                    width={48}
                    height={48}
                    borderRadius="9999px"
                  />
                  <div className="w-full">
                    <Skeleton
                      height={16}
                      width={80}
                      containerClassName="mb-2"
                    />
                    <Skeleton
                      height={14}
                      width="80%"
                      containerClassName="mx-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card Skeleton */}
            <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                  <Skeleton
                    width={48}
                    height={48}
                    borderRadius="9999px"
                  />
                  <div className="w-full">
                    <Skeleton
                      height={16}
                      width={80}
                      containerClassName="mb-2"
                    />
                    <Skeleton
                      height={14}
                      width="70%"
                      containerClassName="mx-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA Card Skeleton */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <Skeleton
                  width={64}
                  height={64}
                  borderRadius="9999px"
                  containerClassName="flex-shrink-0"
                />
                <div className="flex-1 text-center md:text-left w-full">
                  <Skeleton
                    height={24}
                    width={200}
                    containerClassName="mb-2"
                  />
                  <Skeleton
                    height={16}
                    width="90%"
                    containerClassName="mb-4"
                  />
                  <Skeleton
                    height={44}
                    width={180}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section Skeleton */}
          <div className="text-center py-6 md:py-8">
            <Skeleton
              height={16}
              width={150}
              containerClassName="mx-auto mb-4 md:mb-6"
            />

            <div className="flex justify-center items-center gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton
                    width={48}
                    height={48}
                    borderRadius="9999px"
                  />
                  <Skeleton
                    height={12}
                    width={60}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

