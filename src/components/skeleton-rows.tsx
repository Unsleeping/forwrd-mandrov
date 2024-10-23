import { Skeleton } from "./ui/skeleton";

const SkeletonRow = () => (
  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-start max-sm:grid-cols-none min-h-[90px] max-sm:min-h-[393px]">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-28 max-sm:flex hidden rounded-sm" />
      <Skeleton className="h-9 w-full md:mt-2" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-32 max-sm:flex hidden rounded-sm" />
      <Skeleton className="h-9 w-full md:mt-2" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-40 max-sm:flex hidden rounded-sm" />
      <Skeleton className="h-9 w-full md:mt-2" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-24 max-sm:flex hidden rounded-sm" />
      <Skeleton className="h-9 w-full md:mt-2" />
    </div>
    <Skeleton className="h-9 w-9 max-sm:ml-auto md:mt-2" />
  </div>
);

const SkeletonRows = () => (
  <div className="flex-grow">
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </div>
);

export default SkeletonRows;
