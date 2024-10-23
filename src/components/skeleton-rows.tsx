import { Skeleton } from "./ui/skeleton";

const SkeletonRow = () => (
  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-center">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-10" />
  </div>
);

const SkeletonRows = () => (
  <>
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </>
);

export default SkeletonRows;
