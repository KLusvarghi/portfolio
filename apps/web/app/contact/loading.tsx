import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto mt-12 md:mt-0 w-full ">
        {/* Hero Section Skeleton */}
        <div className="flex flex-col gap-2 w-full mb-8 md:mb-12 text-center">
          <Skeleton
            height={48}
            width="60%"
            containerClassName="w-full flex justify-center"
          />
          <div className="flex flex-col gap-1">

            <Skeleton
              height={24}
              width="80%"
              containerClassName="w-full flex justify-center"
            />
            <Skeleton
              height={24}
              width="80%"
              containerClassName="w-full flex justify-center"
            />
            <Skeleton
              height={24}
              width="44%"
              containerClassName="w-full flex justify-center"
            />
          </div>
        </div>

        <div className="space-y-12 md:space-y-12">
          {/* Email and Location Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Email Card Skeleton */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                  <Skeleton
                    width={50}
                    height={50}
                    borderRadius="9999px"
                  />
                  <div className="flex flex-col gap-1 w-full ">
                    <Skeleton
                      height={16}
                      width={80}
                      containerClassName="w-full flex justify-center"

                    />
                    <Skeleton
                      height={14}
                      width="50%"
                      containerClassName="w-full flex justify-center"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card Skeleton */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                  <Skeleton
                    width={50}
                    height={50}
                    borderRadius="9999px"
                  />
                  <div className="flex flex-col gap-1 w-full ">
                    <Skeleton
                      height={16}
                      width={80}
                      containerClassName="w-full flex justify-center"

                    />
                    <Skeleton
                      height={14}
                      width="50%"
                      containerClassName="w-full flex justify-center"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA Card Skeleton */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <Skeleton
                  width={64}
                  height={64}
                  borderRadius="9999px"
                  containerClassName="flex-shrink-0"
                />
                <div className="flex flex-col items-center md:items-start gap-2 flex-1 w-full">
                  <Skeleton
                    width="60%"
                    height={24}
                    containerClassName="w-full flex justify-center md:justify-start"
                  />
                  <Skeleton
                    width={"80%"}
                    height={24}
                    containerClassName="w-full flex justify-center md:justify-start"
                  />
                  <Skeleton
                    height={44}
                    width={200}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section Skeleton */}
          <div className="flex flex-col gap-4 text-center">
            <Skeleton
              height={16}
              width={150}
            />

            <div className="flex justify-center items-center gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton
                    width={52}
                    height={52}
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

