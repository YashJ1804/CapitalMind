import Skeleton from "../ui/Skeleton/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="space-y-3">
        <Skeleton className="h-10 w-72" />

        <Skeleton className="h-5 w-96" />
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            className="h-40 rounded-3xl"
          />
        ))}

      </div>

      {/* Main Card */}

      <Skeleton className="h-96 rounded-3xl" />

    </div>
  );
}