import { Card, CardContent } from "@/components/ui/card";
import { StatsHeader } from "@/components/statistics/stats-header";

export default function SkeletonStats() {
  return (
    <Card className="w-full max-w-4xl border-0 shadow-none">
      <StatsHeader />
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="h-[400px] w-3/4 mx-auto relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="currentColor"
                strokeWidth="40"
                strokeDasharray="10 10"
                className="text-muted animate-pulse"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
