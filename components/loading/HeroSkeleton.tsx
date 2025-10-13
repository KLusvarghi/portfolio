import Skeleton from "react-loading-skeleton"

export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 mb-16">
      <Skeleton width={192} height={64} borderRadius="9999px" />
      <Skeleton width={384} height={48} style={{ maxWidth: '100%' }} />
      <Skeleton width={256} height={24} />
      <div className="flex gap-4 mt-6">
        <Skeleton width={128} height={40} />
        <Skeleton width={128} height={40} />
      </div>
    </div>
  )
}
