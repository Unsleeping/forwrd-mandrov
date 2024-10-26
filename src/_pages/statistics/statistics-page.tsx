import ChartTable from "@/components/statistics/chart-table";
import { preparePieChartData } from "@/_pages/statistics/utils";
import useUserData from "@/hooks/useUserData";
import SkeletonStats from "@/components/skeleton-stats";
import useIsLoading from "@/hooks/useIsLoading";

const StatisticsPage = () => {
  const isLoading = useIsLoading();
  const usersData = useUserData();

  return (
    <section className="max-w-3xl mx-auto py-5">
      {isLoading ? (
        <SkeletonStats />
      ) : (
        <ChartTable dataForChart={preparePieChartData(usersData)} />
      )}
    </section>
  );
};

export default StatisticsPage;
